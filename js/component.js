function Component() {
  this.queue = document.querySelector('.queue');
  this.atms = Array.prototype.slice.call(document.querySelectorAll('.atm'));
}

Component.prototype = {
  setColorRed: function(el) {
    this.atms.forEach(function(atm) {
      if (atm.className.indexOf(el.name) !== -1) {
        atm.style.backgroundColor = 'red';
      }
    });
  },
  setColorGreen: function(el) {
    this.atms.forEach(function(atm) {
      if (atm.className.indexOf(el.name) !== -1) {
        atm.style.backgroundColor = 'green';
      }
    });
  },
  incrementAtm: function(el) {
    this.atms.forEach(function(atm) {
      if (atm.className.indexOf(el.name) !== -1) {
        atm.innerHTML = parseInt(atm.innerHTML) + 1;
      }
    });
  },
  incrementQueue: function() {
    this.queue.innerHTML = parseInt(this.queue.innerHTML) + 1;
  },
  decrementQueue: function() {
    this.queue.innerHTML = parseInt(this.queue.innerHTML) - 1;
  }
};
