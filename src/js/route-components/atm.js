var AtmComponent = require('../components/atm')

function AtmRouteComponent (atm) {
  this.atm = atm
  AtmComponent.call(this, atm)
  this.list = document.createElement('ul')
  this.updateAtmInfo()
  atm.on('Atm_MakeFree', this.updateAtmInfo.bind(this))
}

AtmRouteComponent.prototype = Object.create(AtmComponent.prototype)
AtmRouteComponent.prototype.constructor = AtmRouteComponent

AtmRouteComponent.prototype.updateAtmInfo = function () {
  var result = ''
  this.list.classList.add('atm-info')
  this.atm.visits.forEach(function (visit) {
    result += `<li><h4>${visit.date}</h4></li>
                <li><p>${visit.duration} sec.</p></li>`
  })
  this.list.innerHTML = result
  this.element.appendChild(this.list)
}

module.exports = AtmRouteComponent
