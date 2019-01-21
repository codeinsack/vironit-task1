var utils = require('./utils')
var EventEmitter = require('./eventEmitter')

function Atm () {
  EventEmitter.call(this)
  this.count = 0
  this.isFree = true
}

Atm.prototype = Object.create(EventEmitter.prototype)
Atm.prototype.constructor = Atm

Atm.prototype.makeBusy = function () {
  var self = this
  this.count++
  this.isFree = false
  this.emit('Atm_MakeBusy')
  setTimeout(function () {
    self.makeFree()
  }, utils.randomInteger(1000, 3000))
}

Atm.prototype.makeFree = function () {
  this.isFree = true
  this.emit('Atm_MakeFree')
}

module.exports = Atm
