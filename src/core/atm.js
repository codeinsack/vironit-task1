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
  // врядли это событие должен тригерить этот класс, просто если нужно спрятать крестик,
  // то можно подписаться на событие 'busy' компоненту ATM
  this.emit('hideCross');
  setTimeout(function() {
    self.makeFree();
  }, utils.randomInteger(1000, 3000));
};

Atm.prototype.makeFree = function() {
  this.emit('free', { content: this.count });
  this.isFree = true;
  // тоже самое и с showCross
  this.emit('showCross');
};

module.exports = Atm;
