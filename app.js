var MAX_SEC_ATM = 2500;
var MAX_SEC_QUEUE = 5000;

var firstAtm = {
  el: document.querySelector('.atm1'),
  count: 0,
  isFree: true
};

var secondAtm = {
  el: document.querySelector('.atm2'),
  count: 0,
  isFree: true
};

var queue = {
  el: document.querySelector('.queue'),
  count: 0
};

setInterval(function() {
  if (queue.count > 0 && firstAtm.isFree) {
    incrementAtmCounter(firstAtm);
  } else if (queue.count > 0 && secondAtm.isFree) {
    incrementAtmCounter(secondAtm);
  }
}, 0);

var addPersonToQueue = setTimeout(function tick() {
  queue.count++;
  queue.el.innerHTML = queue.count;
  addPersonToQueue = setTimeout(tick, randomInteger(MAX_SEC_ATM));
}, randomInteger(MAX_SEC_ATM));

function incrementAtmCounter(el) {
  el.isFree = false;
  el.count++;
  el.el.innerHTML = el.count;
  el.el.style.backgroundColor = 'red';
  queue.count--;
  queue.el.innerHTML = queue.count;
  setTimeout(function() {
    el.el.style.backgroundColor = 'green';
    el.isFree = true;
  }, randomInteger(MAX_SEC_QUEUE));
}

function randomInteger(max) {
  var rand = 1000 + Math.random() * (max + 1 - 1000);
  return Math.floor(rand);
}
