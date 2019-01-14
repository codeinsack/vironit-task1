var Component = require('./component');
var crossComponent = require('./cross');

function AtmComponent(params) {
  // ну вот компонент cross есть, а функции hideCross и showCross где-то в другом месте
  this.cross = crossComponent();
  Component.call(this, params);
}

AtmComponent.prototype = Object.create(Component.prototype);
AtmComponent.prototype.constructor = AtmComponent;

AtmComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.html = this.html.replace(/>\d+</, `>${this.params.content}${this.cross}<`);
  this.render(this.html);
};

module.exports = AtmComponent;
