function Component(html, params) {
  this.html = html;
  this.params = params;
  this.makeHtml();
}

Component.prototype = {
  render: function(html) {
    var el = document.getElementById(this.params.id);
    if (!el) {
      this.params.parent.innerHTML += html;
    } else {
      el.outerHTML = html;
    }
  },
  updateParams: function(params) {
    this.params = Object.assign({}, params);
    this.makeHtml();
  },
  makeHtml: function() {
    var classesString = this.params.classes
      .reduce(function(accum, current) {
        return `${accum} ${current}`;
      }, '')
      .trim();
    this.html = this.html.replace('{{class}}', classesString);
    this.html = this.html.replace('{{count}}', this.params.count);
    this.html = this.html.replace('{{id}}', this.params.id);
    this.render(this.html);
  }
};

module.exports = Component;
