var Component = require('./component')

function CloseComponent () {
  Component.call(this)
  this.element.addEventListener('click', this.handleClick.bind(this))
}

CloseComponent.prototype = Object.create(Component.prototype)
CloseComponent.prototype.constructor = CloseComponent

CloseComponent.prototype.render = function () {
  return `<span class="close"></span>`
}

CloseComponent.prototype.handleClick = function () {
  this.element.parentElement.remove()
  this.emit('CloseComponent_Click')
}

module.exports = CloseComponent
