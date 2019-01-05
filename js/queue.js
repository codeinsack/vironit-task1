function Queue() {
  this.count = 10;
}

Queue.prototype = {
  update: function(emitter) {
    setTimeout(function() {
      emitter.makeBusy();
      this.count--;
    }, 1000);
  },
  addPerson: function() {
    this.count++;
    console.log(`Queue.addPerson() ${this.count}`);
  }
};
