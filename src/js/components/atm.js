var uniqid = require('uniqid')
var Component = require('./component')
var CloseComponent = require('./close')
var Atm = require('../core/atm')

function AtmComponent () {
  Component.call(this)
  this.id = uniqid()
  var self = this
  this.core = new Atm()
  this.closeBtn = new CloseComponent()
  this.element.appendChild(this.closeBtn.element)
  this.closeBtn.on('CloseComponent_Click', () => this.emit('CloseComponent_Click', self))
  this.core.on('Atm_MakeBusy', this.increment.bind(this))
  this.core.on('Atm_MakeBusy', this.changeColor.bind(this))
  this.core.on('Atm_MakeFree', this.changeColor.bind(this))
  this.core.on('Atm_MakeBusy', this.changeCloseBtnVisibility.bind(this))
  this.core.on('Atm_MakeFree', this.changeCloseBtnVisibility.bind(this))
}

AtmComponent.prototype = Object.create(Component.prototype)
AtmComponent.prototype.constructor = AtmComponent

AtmComponent.prototype.render = function () {
  return `<div class="rect atm">
            0
          </div>`
}

AtmComponent.prototype.changeColor = function () {
  if (this.element.style.backgroundColor === 'red') {
    this.element.style.backgroundColor = 'green'
  } else {
    this.element.style.backgroundColor = 'red'
  }
}

AtmComponent.prototype.changeCloseBtnVisibility = function () {
  if (this.element.querySelector('.close').style.display !== 'none') {
    this.element.querySelector('.close').style.display = 'none'
  } else {
    this.element.querySelector('.close').style.display = 'block'
  }
}

module.exports = AtmComponent
