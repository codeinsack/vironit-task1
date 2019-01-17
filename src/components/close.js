var uniqid = require('uniqid');

function closeComponent() {
  return `<span href="#" id="${uniqid()}" class="close"></span>`;
}

module.exports = closeComponent;
