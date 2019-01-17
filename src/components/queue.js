var Component = require('./component');
var Queue = require('../core/queue');

function QueueComponent(params) {
  Component.call(this, params);
  this.queue = new Queue();
}

QueueComponent.prototype = Object.create(Component.prototype);
QueueComponent.prototype.constructor = QueueComponent;

QueueComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.render(this.html);
};

module.exports = QueueComponent;
