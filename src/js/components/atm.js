var Component = require('./component')
var CloseComponent = require('./close')

function AtmComponent (atm) {
  Component.call(this)
  this.closeBtn = new CloseComponent()
  this.element.innerHTML = atm.count || 0
  this.element.id = atm.id
  this.element.appendChild(this.closeBtn.element)
  this.closeBtn.on('CloseComponent_Click', () => this.emit('CloseComponent_Click', this))
  atm.on('Atm_MakeBusy', this.increment.bind(this))
  atm.on('Atm_MakeBusy', this.changeColor.bind(this))
  atm.on('Atm_MakeFree', this.changeColor.bind(this))
  atm.on('Atm_MakeBusy', this.changeCloseBtnVisibility.bind(this))
  atm.on('Atm_MakeFree', this.changeCloseBtnVisibility.bind(this))
  this.element.addEventListener('click', this.showDetailedInformation)
}

AtmComponent.prototype = Object.create(Component.prototype)
AtmComponent.prototype.constructor = AtmComponent

AtmComponent.prototype.render = function () {
  return `<div class="rect atm"></div>`
}

AtmComponent.prototype.changeColor = function () {
  // почему бы тернарный оператор не использовать?
  // var bgColor = this.element.style.backgroundColor;
  // this.element.style.backgroundColor = bgColor === 'red' ? 'green' : 'red';
  if (this.element.style.backgroundColor === 'red') {
    this.element.style.backgroundColor = 'green'
  } else {
    this.element.style.backgroundColor = 'red'
  }
}

AtmComponent.prototype.changeCloseBtnVisibility = function () {
  // вот тут лучше querySelector сохранить в переменной, ну и тернарник был бы нагляднее ИМХО
  if (this.element.querySelector('.close').style.display !== 'none') {
    this.element.querySelector('.close').style.display = 'none'
  } else {
    this.element.querySelector('.close').style.display = 'block'
  }
}

AtmComponent.prototype.showDetailedInformation = function (event) {
  var element = event.target
  // присвоил таргет элементу и не используешь. почему не element.tagName === 'DIV'
  if (event.target.tagName === 'DIV') {
    window.location.hash = element.id
  }
}

module.exports = AtmComponent
