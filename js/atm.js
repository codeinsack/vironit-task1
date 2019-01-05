function Atm(name) {
  EventEmitter.call(this);
  this.count = 0;
  this.isFree = true;
  this.name = name;
}

Atm.prototype = Object.assign(EventEmitter.prototype, {
  makeBusy: function() {
    var self = this;
    this.emit('busy');
    this.count++;
    this.isFree = false;
    setTimeout(function() {
      self.makeFree();
    }, randomInteger(1000, 3000));
  },
  makeFree: function() {
    this.emit('free');
    this.isFree = true;
  },
  getIsFree: function() {
    return this.isFree;
  }
});
Atm.prototype.constructor = Atm;
