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
  this.isFree = false;
  setTimeout(function() {
    self.count++;
    self.emit('busy');
    console.log(`${self.name} is busy, count: ${self.count}`);
    setTimeout(function() {
      self.makeFree();
    }, utils.randomInteger(1000, 3000));
  }, 1000);
};

Atm.prototype.makeFree = function() {
  this.emit('free');
  this.isFree = true;
  console.log(`${this.name} is free, count: ${this.count}`);
};

module.exports = Atm;
