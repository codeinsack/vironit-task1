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
