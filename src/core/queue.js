var EventEmitter = require('./eventEmitter');

function Queue() {
  EventEmitter.call(this);
  this.count = 0;
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.add = function() {
  var self = this;
  this.count++;
  self.emit('add');
};

Queue.prototype.remove = function() {
  this.count--;
  this.emit('remove');
};

module.exports = Queue;
