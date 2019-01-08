function QueueComponent() {
  this.queueElement = this.renderQueue();
}

QueueComponent.prototype.incrementQueue = function() {
  this.queueElement.innerHTML = parseInt(this.queueElement.innerHTML) + 1;
};

QueueComponent.prototype.decrementQueue = function() {
  this.queueElement.innerHTML = parseInt(this.queueElement.innerHTML) - 1;
  if (parseInt(this.queueElement.innerHTML) < 0) {
    this.queueElement.innerHTML = 0;
  }
};

QueueComponent.prototype.renderQueue = function() {
  var queue = document.createElement('div');
  queue.classList.add('rect');
  queue.classList.add('queue');
  queue.innerHTML = 0;
  document.body.appendChild(queue);
  return queue;
};
