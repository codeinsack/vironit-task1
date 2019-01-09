var utils = require('./utils');
var EventEmitter = require('./eventEmitter');

function Atm() {
  EventEmitter.call(this);
  Atm.count++;
  this.count = 0;
  this.isFree = true;
  this.name = 'atm' + Atm.count;
}

Atm.count = 0;

Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;

Atm.prototype.makeBusy = function() {
  var self = this;
  this.count++;
  this.emit('busy');
  setTimeout(function() {
    self.makeFree();
  }, utils.randomInteger(1000, 3000));
};

Atm.prototype.makeFree = function() {
  this.isFree = true;
  this.emit('free');
};

module.exports = Atm;
