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
  // а если не каждый раз ты передаешь все параметры? видимо нужно объединять со старыми
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
    // у всех ли компонентов будет в параметрах count?
    // скорее всего придется какую-то часть makeHtml реализовывать в дочерних классах
    this.html = this.html.replace('{{count}}', this.params.count);
    this.html = this.html.replace('{{id}}', this.params.id);
    this.render(this.html);
  }
};

module.exports = Component;
