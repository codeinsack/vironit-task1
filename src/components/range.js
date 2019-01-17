var Component = require('./component');

function RangeComponent(params) {
  Component.call(this, params);
  this.value = document.getElementById(this.params.id).getElementsByTagName('label')[0].innerHTML;
}

RangeComponent.prototype = Object.create(Component.prototype);
RangeComponent.prototype.constructor = RangeComponent;

RangeComponent.prototype.makeHtml = function() {
  Component.prototype.makeHtml.call(this);
  this.html = this.html.replace(
    /></,
    `><button class="btn">-</button><label>${this.params.value}</label><button class="btn">+</button><`
  );
  this.render(this.html);
};

module.exports = RangeComponent;
