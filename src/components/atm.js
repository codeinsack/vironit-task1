var Component = require('./component');
var Atm = require('../core/atm');
var closeComponent = require('./close');

function AtmComponent(params) {
  this.close = closeComponent();
  Component.call(this, params);
  this.atm = new Atm();
}

AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

AtmComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.html = this.html.replace(/>\d+</, `>${this.params.content}${this.close}<`);
  this.render(this.html);
};

AtmComponent.prototype.hideCross = function() {
  var id = this.close.slice(19, 27);
  document.getElementById(id).style.display = 'none';
};

AtmComponent.prototype.showCross = function() {
  var id = this.close.slice(19, 27);
  document.getElementById(id).style.display = 'block';
};

module.exports = AtmComponent;
