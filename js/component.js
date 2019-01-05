function Component() {
  this.queue = document.querySelector('.queue');
  this.atm1 = document.querySelector('.atm1');
  this.atm2 = document.querySelector('.atm2');
  this.queue.style.backgroundColor = 'blue';
  this.atm1.style.backgroundColor = 'green';
  this.atm2.style.backgroundColor = 'green';
}

Component.prototype = {
  setColorRed: function(el) {
    if (el.name === 'atm1') {
      this.atm1.style.backgroundColor = 'red';
    } else {
      this.atm2.style.backgroundColor = 'red';
    }
  },
  setColorGreen: function(el) {
    if (el.name === 'atm1') {
      this.atm1.style.backgroundColor = 'green';
    } else {
      this.atm2.style.backgroundColor = 'green';
    }
  },
  incrementAtm: function(el) {
    if (el.name === 'atm1') {
      this.atm1.innerHTML = parseInt(this.atm1.innerHTML) + 1;
    } else if (el.name === 'atm2') {
      this.atm2.innerHTML = parseInt(this.atm2.innerHTML) + 1;
    }
  },
  incrementQueue: function() {
    this.queue.innerHTML = parseInt(this.queue.innerHTML) + 1;
  },
  decrementQueue: function() {
    this.queue.innerHTML = parseInt(this.queue.innerHTML) - 1;
    if (parseInt(this.queue.innerHTML) < 0) {
      this.queue.innerHTML = 0;
    }
  }
};
