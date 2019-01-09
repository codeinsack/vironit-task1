function Component() {}

Component.prototype = {
  // а для чего тогда params? может к html их нужно как-то применить?
  // т.е. html лучше сделать как свойство класса, сделать функцию, которая по params будет формировать конечный html
  // вцелом и params должно быть как свойство и меняться в в методе updateParams
  render: function(id, html, params) {
    var el = document.getElementById(id);
    if (!el) {
      // а если нужно рендерить внутри какого-то div'a?
      document.body.innerHTML += html;
    } else {
      el.outerHTML = html;
    }
  },
  updateParams: function() {}
};

module.exports = Component;
