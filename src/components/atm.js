var Component = require('./component');

function AtmComponent(params) {
  Component.call(this, params);
}

AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

AtmComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  // this.html = this.html.replace(
  //   />\d</,
  //   `>${`${this.params.content}<span id="${this.params.id}close" class="close"></span>`}<`
  // );
  this.render(this.html);
};

module.exports = AtmComponent;
