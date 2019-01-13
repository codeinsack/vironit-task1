var Component = require('./component');

function InputComponent(params) {
  Component.call(this, params);
}

InputComponent.prototype = Object.create(Component.prototype);
InputComponent.prototype.constructor = InputComponent;

InputComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.html = this.html.replace(/">/, `" value="${this.params.value}" type="number" >`);
  this.render(this.html);
};

module.exports = InputComponent;
