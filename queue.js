function Queue() {
  EventEmitter.call(this);
  this.count = 0;
  this.atmList = [];
}

Queue.prototype = Object.create(EventEmitter.prototype);
Queue.prototype.constructor = Queue;

Queue.prototype.addPerson = function() {
  this.emit('addPerson');
  this.count++;
  this.sendPersonToAtm();
};

Queue.prototype.sendPersonToAtm = function() {
  var self = this;
  for (var i = 0; i < this.atmList.length; i++) {
    if (this.atmList[i].getIsFree() && this.count > 0) {
      this.atmList[i].setFalse();
      setTimeout(function() {
        self.emit('removePerson');
        self.atmList[i].makeBusy();
        self.count--;
      }, 1000);
      break;
    }
  }
};

Queue.prototype.addAtm = function(atm) {
  this.atmList.push(atm);
};
