var eventEmitter = require('./eventEmitter');

function Queue() {
  this.count = 0;
}

Queue.prototype.add = function() {
  this.count++;
  eventEmitter.emit('add', { content: this.count });
};

Queue.prototype.remove = function() {
  this.count--;
  eventEmitter.emit('remove', { content: this.count });
};

module.exports = Queue;
