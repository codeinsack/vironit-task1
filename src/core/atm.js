var uniqid = require('uniqid');
var utils = require('./utils');
var EventEmitter = require('./eventEmitter');

function Atm() {
  EventEmitter.call(this);
  this.count = 0;
  this.isFree = true;
  this.id = uniqid();
}

Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;

Atm.prototype.makeBusy = function() {
  var self = this;
  this.count++;
  this.emit('busy', { content: this.count });
  this.emit('hideCross');
  setTimeout(function() {
    self.makeFree();
  }, utils.randomInteger(1000, 3000));
};

Atm.prototype.makeFree = function() {
  this.emit('free', { content: this.count });
  this.isFree = true;
  this.emit('showCross');
};

module.exports = Atm;
