function MainComponent() {}

MainComponent.prototype = {
  setColorRed: function(el, atm) {
    if (atm.className.indexOf(el.name) !== -1) {
      atm.style.backgroundColor = 'red';
    }
  },
  setColorGreen: function(el, atm) {
    if (atm.className.indexOf(el.name) !== -1) {
      atm.style.backgroundColor = 'green';
    }
  }
};
