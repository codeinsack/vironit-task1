var Component = require('./component');

function CrossComponent(params) {
  Component.call(this, params);
}

CrossComponent.prototype = Object.create(Component.prototype);
CrossComponent.prototype.constructor = CrossComponent;

CrossComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.render(this.html);
};

module.exports = CrossComponent;
