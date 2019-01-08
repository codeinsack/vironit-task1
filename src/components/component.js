function Component() {}

Component.prototype = {
  render: function(id, html, params) {
    var el = document.getElementById(id);
    if (!el) {
      document.body.innerHTML += html;
    } else {
      el.outerHTML = html;
    }
  },
  updateParams: function() {}
};

module.exports = Component;
