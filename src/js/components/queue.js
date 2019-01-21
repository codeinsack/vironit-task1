var Component = require('./component')
var Queue = require('../core/queue')

function QueueComponent () {
  Component.call(this)
  this.core = new Queue()
  this.core.on('Queue_Add', this.increment.bind(this))
  this.core.on('Queue_Remove', this.decrement.bind(this))
}

QueueComponent.prototype = Object.create(Component.prototype)
QueueComponent.prototype.constructor = QueueComponent

QueueComponent.prototype.render = function () {
  return `<div class="rect queue">
            0
          </div>`
}

module.exports = QueueComponent
