require('./main.css')
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

var atmComponents = Array(3)
  .fill(null)
  .map(function () {
    var atmComponent = new AtmComponent()
    atmComponent.on('CloseComponent_Click', deleteAtm.bind(atmComponent))
    atmComponent.core.on('Atm_MakeFree', findFreeAtm.bind(atmComponent))
    leftContainer.appendChild(atmComponent.element)
    return atmComponent
  })
queueComponent.core.on('Queue_Add', findFreeAtm)
queueComponent.core.on('Queue_Add', checkQueueLength)
queueComponent.core.on('Queue_Remove', startTimer)

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
      atmComponents.splice(i, 1)
    }
  }
}

function addAtm () {
  clearInterval(queueOverflowTimer)
  var newAtm = new AtmComponent()
  newAtm.on('CloseComponent_Click', deleteAtm)
  newAtm.core.on('Atm_MakeFree', findFreeAtm)
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
