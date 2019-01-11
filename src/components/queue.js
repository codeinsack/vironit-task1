var Component = require('./component');

function QueueComponent(params) {
  Component.call(this, params);
}

QueueComponent.prototype = Object.create(Component.prototype);
QueueComponent.prototype.constructor = QueueComponent;

QueueComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.render(this.html);
};

module.exports = QueueComponent;
