var Component = require('./component');

function QueueComponent(id, html) {
  Component.call(this);
  this.render(id, html);
}

QueueComponent.prototype = Object.create(Component.prototype);
QueueComponent.prototype.constructor = QueueComponent;

module.exports = QueueComponent;
