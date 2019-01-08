function AddAtmButton() {
  this.btnElement = this.renderBtn();
}

AddAtmButton.prototype.renderBtn = function() {
  var btn = document.createElement('button');
  btn.id = 'btnAddAtm';
  btn.innerHTML = 'Add ATM';
  document.body.appendChild(btn);
  return btn;
};
