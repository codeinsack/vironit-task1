var Component = require('./component')

// можно было просто в компонент всунуть сразу 2 инпута, и не пришлось бы сиблинги использовать в других местах
function RangeComponent () {
  var self = this
  Component.call(this)
  RangeComponent.count++
  this.input = this.element.querySelector('input')
  this.label = this.element.querySelector('label')
  this.input.addEventListener('change', self.updateRangeValue.bind(self))
}

RangeComponent.prototype = Object.create(Component.prototype)
RangeComponent.prototype.constructor = RangeComponent

RangeComponent.count = 0

RangeComponent.prototype.render = function () {
  var one = RangeComponent.count
  // закрывающий инпут не нужен
  return `<div class="range ${!one ? 'range-min' : 'range-max'}">
            <label>${!one ? 2 : 4}</label>
            <input type="range" value="${!one ? 2 : 4}" min="${!one ? 0 : 1}" max="${!one ? 9 : 10}"></input> 
          </div>`
}

RangeComponent.prototype.updateRangeValue = function () {
  this.emit('RangeComponent_Change')
  this.label.innerHTML = this.input.value
}

module.exports = RangeComponent
