var EventEmitter = require('./eventEmitter')

function Queue () {
  EventEmitter.call(this)
  this.count = 0
}

Queue.prototype = Object.create(EventEmitter.prototype)
Queue.prototype.constructor = Queue

Queue.prototype.add = function () {
  this.count++
  this.emit('Queue_Add')
}

Queue.prototype.remove = function () {
  this.count--
  this.emit('Queue_Remove')
}

module.exports = Queue
