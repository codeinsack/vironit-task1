var uniqid = require('uniqid');
var QueueComponent = require('./components/queue');
var AtmComponent = require('./components/atm');
var RangeComponent = require('./components/range');
var AddComponent = require('./components/add');
var utils = require('./core/utils');
var timer = { id: null };
// var timerId = null;

var queueComponent = new QueueComponent({
  classes: ['rect', 'queue'],
  id: uniqid(),
  content: 0,
  parent: document.querySelector('.container__left')
});

var atmComponents = Array(2)
  .fill(null)
  .map(function() {
    return new AtmComponent({
      classes: ['rect', 'atm'],
      id: uniqid(),
      content: 0,
      parent: document.querySelector('.container__left')
    });
  });

var addComponent = new AddComponent({
  classes: ['btn', 'btn-add'],
  id: 'addAtm',
  content: 'Add ATM',
  parent: document.querySelector('.container__right')
});

var rangeComponents = Array(2)
  .fill(null)
  .map(function(el, i) {
    return new RangeComponent({
      classes: i === 0 ? ['range', 'range-start'] : ['range', 'range-end'],
      id: uniqid(),
      content: '',
      parent: document.querySelector('.container__right'),
      value: i === 0 ? 2 : 4
    });
  });

document.getElementById(addComponent.params.id).addEventListener('click', function() {
  createNewAtm();
});

document.querySelector('.container__left').addEventListener('click', function(event) {
  if (event.target.tagName === 'SPAN') {
    var id = event.target.parentElement.id;
    for (var i = 0; i < atmComponents.length; i++) {
      if (atmComponents[i].params.id === id) {
        atmComponents.splice(i, 1);
      }
    }
    event.target.parentElement.remove();
  }
});

document.querySelector('.container__right').addEventListener('click', function(event) {
  var min = document.querySelector('.range-start').querySelector('label').innerHTML;
  var max = document.querySelector('.range-end').querySelector('label').innerHTML;
  var labelValue = parseInt(event.target.closest('div').querySelector('label').innerHTML);
  var labelElement = event.target.closest('div').querySelector('label');
  if (event.target.innerHTML === '-') {
    labelElement.innerHTML = labelValue - 1;
    if (labelElement.innerHTML < 0) {
      labelElement.innerHTML = 0;
    }
    clearTimeout(timer.id);
    utils.queueGenerator(queueComponent.queue, min, max, timer);
  } else if (event.target.innerHTML === '+') {
    labelElement.innerHTML = labelValue + 1;
    clearTimeout(timer.id);
    utils.queueGenerator(queueComponent.queue, min, max, timer);
  }
});

queueComponent.queue.on('add', queueComponent.updateParams.bind(queueComponent));
queueComponent.queue.on('add', utils.findFreeAtm.bind(null, atmComponents, queueComponent));
queueComponent.queue.on('remove', queueComponent.updateParams.bind(queueComponent));
queueComponent.queue.on('add', getQueueLength);
// queueComponent.queue.on('add', stopTimer);
// queueComponent.queue.on('remove', startTimer);
utils.subscribeATMs(atmComponents, queueComponent);

utils.queueGenerator(queueComponent.queue, rangeComponents[0].value, rangeComponents[1].value, timer);

function getQueueLength() {
  new Promise(function(resolve) {
    if (queueComponent.queue.count === 10) {
      resolve();
    }
  }).then(function() {
    createNewAtm();
  });
}

function createNewAtm() {
  atmComponents.push(
    new AtmComponent({
      classes: ['rect', 'atm'],
      id: uniqid(),
      content: 0,
      parent: document.querySelector('.container__left')
    })
  );
  var lastIndex = atmComponents.length - 1;
  utils.subscribeATMs(atmComponents, queueComponent, lastIndex);
}

// function deleteLastAtm() {
//   var index = atmComponents.length - 1;
//   var id = atmComponents[index].params.id;
//   atmComponents.splice(index, 1);
//   document.getElementById(id).remove();
// }

// function startTimer() {
//   timerId = setTimeout(function() {
//     if (atmComponents.length > 1) {
//       deleteLastAtm();
//     }
//   }, 4000);
// }

// function stopTimer() {
//   clearTimeout(timerId);
// }
