var EventEmitter = require('./eventEmitter');

function Queue() {
  EventEmitter.call(this);
  this.count = 0;
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.add = function() {
  this.count++;
  this.emit('add', { content: this.count });
};

Queue.prototype.remove = function() {
  this.emit('remove', { content: this.count });
};

module.exports = Queue;
