var EventEmitter = require('../core/eventEmitter');

function Component(params) {
  EventEmitter.call(this);
  this.params = params;
  this.makeHtml();
}

Component.prototype = Object.create(EventEmitter.prototype);
Component.prototype.constructor = Component;

Component.prototype.render = function(html) {
  var el = document.getElementById(this.params.id);
  if (!el) {
    this.params.parent.innerHTML += html;
  } else {
    el.outerHTML = html;
  }
};

Component.prototype.updateParams = function(params) {
  for (var prop in params) {
    if (params.hasOwnProperty(prop)) {
      this.params[prop] = params[prop];
    }
  }
  this.makeHtml();
};

Component.prototype.makeHtml = function() {
  this.html = `<{{element}} id="{{id}}" class="{{class}}">{{content}}</{{element}}>`;
  var classesString = this.params.classes
    .reduce(function(accum, current) {
      return `${accum} ${current}`;
    }, '')
    .trim();
  this.html = this.html.replace('{{element}}', this.params.element);
  this.html = this.html.replace('{{class}}', classesString);
  this.html = this.html.replace('{{id}}', this.params.id);
  this.html = this.html.replace('{{content}}', this.params.content);
};

module.exports = Component;
