var Component = require('./component');

function ButtonComponent(params) {
  Component.call(this, params);
}

ButtonComponent.prototype = Object.create(Component.prototype);
ButtonComponent.prototype.constructor = ButtonComponent;

ButtonComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.render(this.html);
};

module.exports = ButtonComponent;
