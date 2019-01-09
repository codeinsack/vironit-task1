var Component = require('./component');

function AtmComponent(id, html) {
  // Конструктор Component принимает еще и параметры
  Component.call(this);
  this.render(id, html);
}

AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

module.exports = AtmComponent;
