function Atm() {
  EventEmitter.call(this);
  Atm.count++;
  this.count = 0;
  this.isFree = true;
  this.name = 'atm' + Atm.count;
}

Atm.count = 0;

Atm.prototype = Object.create(EventEmitter.prototype);
Atm.prototype.constructor = Atm;

Atm.prototype.makeBusy = function() {
  var self = this;
  this.emit('busy');
  this.count++;
  setTimeout(function() {
    self.makeFree();
  }, randomInteger(1000, 3000));
};

Atm.prototype.makeFree = function() {
  this.emit('free');
  this.isFree = true;
};

Atm.prototype.getIsFree = function() {
  return this.isFree;
};

Atm.prototype.setFalse = function() {
  this.isFree = false;
};
