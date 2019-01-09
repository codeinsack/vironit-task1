var Component = require('./component');

function QueueComponent(html, params) {
  // делает тоже самое что и родитель? зачем дублировать код?
  this.html = html;
  this.params = params;
  this.makeHtml();
}

QueueComponent.prototype = Object.create(Component.prototype);
QueueComponent.prototype.constructor = QueueComponent;

module.exports = QueueComponent;
