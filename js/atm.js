function Atm(name) {
  EventEmitter.call(this);
  this.count = 0;
  this.isFree = true;
  this.name = name;
}

Atm.prototype = {
  makeBusy: function() {
    this.count++;
    this.isFree = false;
    var self = this;
    console.log(`Atm.makeBusy() ${this.name} ${this.count}`);
    setTimeout(function() {
      self.makeFree();
    }, randomInteger(1000, 3000));
  },
  makeFree: function() {
    this.isFree = true;
    this.emit('free');
    console.log(`Atm.makeFree() ${this.name} ${this.count}`);
  }
};

Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;
