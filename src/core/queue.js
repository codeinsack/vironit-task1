var EventEmitter = require('./eventEmitter');

function Queue() {
  EventEmitter.call(this);
  this.count = 0;
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.add = function() {
  this.count++;
  console.log(`Queue.add() queue count: ${this.count}`);
  this.emit('add');
};

Queue.prototype.remove = function() {
  this.count--;
  console.log(`Queue.remove() queue count: ${this.count}`);
  this.emit('remove');
};

module.exports = Queue;
