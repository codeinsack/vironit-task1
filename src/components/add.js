var Component = require('./component');

function AddComponent(params) {
  Component.call(this, params);
}

AddComponent.prototype = Object.create(Component.prototype);
AddComponent.prototype.constructor = AddComponent;

AddComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.html = this.html.replace(/div/g, 'button');
  this.render(this.html);
};

module.exports = AddComponent;
