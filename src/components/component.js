var EventEmitter = require('../core/eventEmitter')

function Component () {
  EventEmitter.call(this)
  this.element = strToDOM(this.render())

  function strToDOM (htmlString) {
    var [ , openTag, content ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString)
    var tagName = /\w+/.exec(openTag)
    var element = document.createElement(tagName)
    var reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g
    var reParamsExecResult
    while ((reParamsExecResult = reParams.exec(openTag))) {
      element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])
    }
    element.innerHTML = content.trim()
    return element
  }
}

Component.prototype = Object.create(EventEmitter.prototype)
Component.prototype.constructor = Component

Component.prototype.increment = function () {
  this.element.childNodes[0].nodeValue = parseInt(this.element.childNodes[0].nodeValue) + 1
}

Component.prototype.decrement = function () {
  this.element.childNodes[0].nodeValue = parseInt(this.element.childNodes[0].nodeValue) - 1
}

module.exports = Component
