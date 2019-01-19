var Component = require('./component')

function AddComponent () {
  Component.call(this)
  this.element.addEventListener('click', this.handleClick.bind(this))
}

AddComponent.prototype = Object.create(Component.prototype)
AddComponent.prototype.constructor = AddComponent

AddComponent.prototype.render = function () {
  return `<button class="btn btn-add">
            Add ATM
          </button>`
}

AddComponent.prototype.handleClick = function () {
  this.emit('AddComponent_Click')
}

module.exports = AddComponent
