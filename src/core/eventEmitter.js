function EventEmitter() {
  this.eventTable = {};
}

EventEmitter.prototype = {
  on: function(event, callback) {
    if (!this.eventTable.hasOwnProperty(event)) {
      this.eventTable[event] = [];
    }
    this.eventTable[event].push(callback);
  },

  emit: function(event, ...rest) {
  // а зачем перебор по всем ключам, если достаточно проверить наличие ключа event
  // в eventTable и вызвать все коллбеки
    for (var key in this.eventTable) {
      if (key === event) {
        this.eventTable[key].forEach(function(callback) {
          callback.apply(null, rest);
        });
      }
    }
  }
};

module.exports = EventEmitter;
