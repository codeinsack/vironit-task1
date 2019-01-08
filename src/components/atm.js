var Component = require('./component');

function AtmComponent(id, html) {
  Component.call(this);
  this.render(id, html);
}

AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

module.exports = AtmComponent;
