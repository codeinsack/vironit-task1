function AtmComponent() {
  MainComponent.call(this);
  AtmComponent.count++;
  this.elementAtm = this.renderAtm();
}

AtmComponent.prototype = Object.create(MainComponent.prototype);
AtmComponent.prototype.constructor = QueueComponent;

AtmComponent.count = 0;

AtmComponent.prototype.incrementAtm = function(el, atm) {
  if (atm.className.indexOf(el.name) !== -1) {
    atm.innerHTML = parseInt(atm.innerHTML) + 1;
  }
};

AtmComponent.prototype.renderAtm = function() {
  var atm = document.createElement('div');
  atm.classList.add('rect');
  atm.classList.add('atm');
  atm.classList.add('atm' + AtmComponent.count);
  atm.innerHTML = 0;
  document.body.appendChild(atm);
  return atm;
};
