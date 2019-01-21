function EventEmitter () {
  this.eventTable = {}
}

EventEmitter.prototype = {
  on: function (event, callback) {
    if (!this.eventTable.hasOwnProperty(event)) {
      this.eventTable[event] = []
    }
    this.eventTable[event].push(callback)
  },

  emit: function (event, ...rest) {
    if (event in this.eventTable) {
      this.eventTable[event].forEach(function (callback) {
        callback.apply(null, rest)
      })
    }
  }
}

module.exports = EventEmitter
