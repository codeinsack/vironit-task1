var uniqid = require('uniqid');

function crossComponent() {
  return `<span id="${uniqid()}" class="close"></span>`;
}

module.exports = crossComponent;
