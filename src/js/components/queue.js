var Component = require('./component')

function QueueComponent (queue) {
  this.queue = queue
  Component.call(this)
  queue.on('Queue_Add', this.increment.bind(this))
  queue.on('Queue_Remove', this.decrement.bind(this))
}

QueueComponent.prototype = Object.create(Component.prototype)
QueueComponent.prototype.constructor = QueueComponent

QueueComponent.prototype.render = function () {
  return `<div class="rect queue">
            ${this.queue.count}
          </div>`
}

module.exports = QueueComponent
