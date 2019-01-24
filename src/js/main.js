var axios = require('axios')
var utils = require('./core/utils')
var queueGeneratorTimer = null
var queueOverflowTimer = null

var QueueComponent = require('./components/queue')
var AtmComponent = require('./components/atm')
var AddComponent = require('./components/add')
var RangeComponent = require('./components/range')

var leftContainer = document.querySelector('.container__left')
var rightContainer = document.querySelector('.container__right')

var queueComponent = new QueueComponent()
leftContainer.appendChild(queueComponent.element)

queueComponent.core.on('Queue_Add', findFreeAtm)
queueComponent.core.on('Queue_Add', checkQueueLength)
queueComponent.core.on('Queue_Remove', startTimer)

var atmComponents = []

axios.get('http://localhost:3000')
  .then(function (response) {
    response.data.forEach(function (atm) {
      var atmComponent = new AtmComponent(atm.id, atm.count)
      atmComponent.on('CloseComponent_Click', deleteAtm.bind(atmComponent))
      atmComponent.core.on('Atm_MakeFree', findFreeAtm.bind(atmComponent))
      atmComponent.core.on('Atm_MakeBusy', updateServerAtm.bind(atmComponent, atmComponent))
      leftContainer.appendChild(atmComponent.element)
      atmComponents.push(atmComponent)
    })
  })

var addComponent = new AddComponent()
addComponent.on('AddComponent_Click', addAtm)
rightContainer.appendChild(addComponent.element)

var rangeComponents = Array(2)
  .fill(null)
  .map(function () {
    var rangeComponent = new RangeComponent()
    rangeComponent.on('RangeComponent_Change', changeRange.bind(null, rangeComponent))
    rightContainer.appendChild(rangeComponent.element)
    return rangeComponent
  })

queueGenerator(rangeComponents[0].input.value * 1000, rangeComponents[1].input.value * 1000)

function queueGenerator (min, max) {
  queueGeneratorTimer = setTimeout(function () {
    queueComponent.core.add()
    queueGenerator(min, max)
  }, utils.randomInteger(min, max))
}

function findFreeAtm () {
  setTimeout(function () {
    if (!atmComponents) return
    var freeAtm = atmComponents.find(function (atmComponent) {
      return atmComponent.core.isFree && queueComponent.core.count > 0
    })
    if (freeAtm) {
      queueComponent.core.remove()
      freeAtm.core.makeBusy()
    }
  }, 1000)
}

function deleteAtm (deleteAtm) {
  for (var i = 0; i < atmComponents.length; i++) {
    if (deleteAtm.id === atmComponents[i].id) {
      axios.delete('http://localhost:3000/', { data: { id: deleteAtm.id } })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      atmComponents.splice(i, 1)
    }
  }
}

function addAtm () {
  clearInterval(queueOverflowTimer)
  var newAtm = new AtmComponent()
  axios.post('http://localhost:3000/', {
    id: newAtm.id,
    count: 0
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  newAtm.on('CloseComponent_Click', deleteAtm)
  newAtm.core.on('Atm_MakeFree', findFreeAtm)
  newAtm.core.on('Atm_MakeBusy', updateServerAtm.bind(newAtm, newAtm))
  leftContainer.appendChild(newAtm.element)
  atmComponents.push(newAtm)
  findFreeAtm()
}

function changeRange (range) {
  var rangeMinElement, rangeMaxElement
  if (Array.from(range.element.classList).indexOf('range-min') !== -1) {
    rangeMinElement = range.input
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
  clearInterval(queueGeneratorTimer)
  queueGenerator(rangeMinElement.value * 1000, rangeMaxElement.value * 1000)
}

function checkQueueLength () {
  if (queueComponent.core.count > 10) {
    addAtm()
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
  var index = atmComponents.length - 1
  if (index < 1) return
  atmComponents[index].element.remove()
  atmComponents.splice(index, 1)
}

function updateServerAtm (atm) {
  axios.put('http://localhost:3000/', {
    id: atm.id,
    count: atm.core.count
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
