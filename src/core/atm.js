var uniqid = require('uniqid');
var utils = require('./utils');
var eventEmitter = require('./eventEmitter');

function Atm() {
  this.count = 0;
  this.isFree = true;
  this.id = uniqid();
}

Atm.prototype.makeBusy = function() {
  var self = this;
  this.count++;
  eventEmitter.emit('busy', { content: this.count });
  setTimeout(function() {
    self.makeFree();
  }, utils.randomInteger(1000, 3000));
};

Atm.prototype.makeFree = function() {
  eventEmitter.emit('free', { content: this.count });
  this.isFree = true;
};

module.exports = Atm;
