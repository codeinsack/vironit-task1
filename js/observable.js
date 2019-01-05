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

  emit: function(event) {
    for (var key in this.eventTable) {
      if (key === event) {
        for (var i = 0; i < this.eventTable[key].length; i++) {
          this.eventTable[key][i]();
        }
      }
    }
  }
};
