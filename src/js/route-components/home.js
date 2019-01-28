var axios = require('axios')
var utils = require('../core/utils')

var QueueComponent = require('../components/queue')
var AtmComponent = require('../components/atm')
var AddComponent = require('../components/add')
var RangeComponent = require('../components/range')
var Queue = require('../core/queue')
var Atm = require('../core/atm')

var queue = new Queue()
var atms = []
var queueComponent, addComponent
var atmComponents = []
var rangeComponents = []
var rangeMinValue = 2
var rangeMaxValue = 4
var queueGeneratorTimer = null
var queueOverflowTimer = null

function HomeRouteComponent (parentElements) {
  this.leftContainer = parentElements.left
  this.rightContainer = parentElements.right

  queue.on('Queue_Add', findFreeAtm)
  queue.on('Queue_Add', checkQueueLength.bind(null, this))
  queue.on('Queue_Remove', startTimer)

  // а если сервер не отвечает, где обработка ошибки?)
  axios.get('http://localhost:3000')
    .then(response => {
      response.data.forEach(serverAtm => {
        var atm = new Atm(serverAtm.id, serverAtm.count, serverAtm.visits)
        atm.on('Atm_MakeFree', findFreeAtm)
        atm.on('Atm_MakeBusy', updateServerAtm.bind(null, atm))
        atms.push(atm)
      })
      queueGenerator(rangeMinValue * 1000, rangeMaxValue * 1000)
      this.renderComponents()
    })
}

HomeRouteComponent.prototype.renderComponents = function () {
  queueComponent = new QueueComponent(queue)
  this.leftContainer.appendChild(queueComponent.element)
  atms.forEach(atm => {
    var atmComponent = new AtmComponent(atm)
    atmComponent.on('CloseComponent_Click', deleteAtm.bind(null, atmComponent))
    this.leftContainer.appendChild(atmComponent.element)
    atmComponents.push(atmComponent)
  })
  addComponent = new AddComponent()
  addComponent.on('AddComponent_Click', addAtm.bind(null, this))
  this.rightContainer.appendChild(addComponent.element)
  rangeComponents = Array(2)
    .fill(null)
    .map(() => {
      var rangeComponent = new RangeComponent()
      rangeComponent.on('RangeComponent_Change', changeRange.bind(null, rangeComponent))
      this.rightContainer.appendChild(rangeComponent.element)
      return rangeComponent
    })
}

HomeRouteComponent.prototype.removeComponents = function () {
  queueComponent.element.remove()
  queueComponent = null
  atmComponents.forEach(atm => {
    atm.element.remove()
  })
  atmComponents = []
  addComponent.element.remove()
  addComponent = null
  rangeComponents[0].element.remove()
  rangeComponents[1].element.remove()
  rangeComponents = []
}

function queueGenerator (min, max) {
  queueGeneratorTimer = setTimeout(function () {
    queue.add()
    queueGenerator(min, max)
  }, utils.randomInteger(min, max))
}

function findFreeAtm () {
  setTimeout(function () {
    if (!atms) return
    var freeAtm = atms.find(function (atm) {
      return atm.isFree && queue.count > 0
    })
    if (freeAtm) {
      queue.remove()
      freeAtm.makeBusy()
    }
  }, 1000)
}

function updateServerAtm (atm) {
  axios.put('http://localhost:3000/', {
    id: atm.id,
    count: atm.count,
    visits: atm.visits
  })
    .catch(function (error) {
      console.log(error)
    })
}

function addAtm (context) {
  clearInterval(queueOverflowTimer)
  var newAtm = new Atm()
  newAtm.on('Atm_MakeFree', findFreeAtm)
  newAtm.on('Atm_MakeBusy', updateServerAtm.bind(null, newAtm))
  // может пуш нужно делать, если удачный ответ пришел от сервера, что атм добавлен?
  atms.push(newAtm)
  axios.post('http://localhost:3000/', {
    id: newAtm.id,
    count: newAtm.count,
    visits: newAtm.visits
  })
    .then(function () {
      var newAtmComponent = new AtmComponent(newAtm)
      context.leftContainer.appendChild(newAtmComponent.element)
      atmComponents.push(newAtmComponent)
    })
    .catch(function (error) {
      console.log(error)
    })
  findFreeAtm()
}

function deleteAtm (atmComponent) {
  // тут цикл пройдет в любом случае по всем атмам, а тебе нужен только один, подумай как оптимизировать
  for (var i = 0; i < atms.length; i++) {
    if (atmComponent.element.id === atms[i].id) {
      axios.delete('http://localhost:3000/', { data: { id: atmComponent.element.id } })
        .catch(function (error) {
          console.log(error)
        })
      atmComponents.splice(i, 1)
      atms.splice(i, 1)
    }
  }
}

function changeRange (range) {
  var rangeMinElement, rangeMaxElement
  if (Array.from(range.element.classList).indexOf('range-min') !== -1) {
    rangeMinElement = range.input
    // плохо привязываться к сиблингам. на 155 строке вообще жесть)
    rangeMaxElement = range.element.nextSibling.querySelector('input')
    if (rangeMinElement.value >= rangeMaxElement.value) {
      rangeMaxElement.value = parseInt(rangeMinElement.value) + 1
      rangeMaxElement.previousSibling.previousSibling.innerHTML = rangeMaxElement.value
    }
  } else {
    rangeMaxElement = range.input
    rangeMinElement = range.element.previousSibling.querySelector('input')
    if (rangeMaxElement.value <= rangeMinElement.value) {
      rangeMinElement.value = parseInt(rangeMaxElement.value) - 1
      rangeMinElement.previousSibling.previousSibling.innerHTML = rangeMinElement.value
    }
  }
  rangeMinValue = rangeMinElement.value
  rangeMaxValue = rangeMaxElement.value
  clearInterval(queueGeneratorTimer)
  queueGenerator(rangeMinValue * 1000, rangeMaxValue * 1000)
}

function checkQueueLength (context) {
  if (queue.count > 10) {
    addAtm(context)
  }
}

function startTimer () {
  clearInterval(queueOverflowTimer)
  queueOverflowTimer = setTimeout(function () {
    deleteLastAtm()
    startTimer()
  }, 5000)
}

function deleteLastAtm () {
  var index = atms.length - 1
  if (index < 1) return
  axios.delete('http://localhost:3000/', { data: { id: atms[index].id } })
    .catch(function (error) {
      console.log(error)
    })
  atmComponents[index].element.remove()
  atmComponents.splice(index, 1)
  atms.splice(index, 1)
}

module.exports = HomeRouteComponent
module.exports.atms = atms
