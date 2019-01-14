var uniqid = require('uniqid');
var utils = require('./core/utils');
var Atm = require('./core/atm');
var Queue = require('./core/queue');
var QueueComponent = require('./components/queue');
var AtmComponent = require('./components/atm');
var ButtonComponent = require('./components/button');
var EventEmitter = require('./core/eventEmitter');
var InputComponent = require('./components/input');
var timerId = { timer: null };
var tmrId = null;

var eventEmitter = new EventEmitter();

var queue = new Queue();
var atms = Array(2)
  .fill(null)
  .map(function() {
    return new Atm();
  });

var queueParams = {
  classes: ['rect', 'queue'],
  content: queue.count,
  parent: document.getElementById('view'),
  id: 'queue',
  element: 'div'
};
var queueComponent = new QueueComponent(queueParams);

var atmComponents = atms.map(function(atm, i) {
  var atmParams = makeAtmParams(atm, i);
  var atmComponent = new AtmComponent(atmParams);
  return atmComponent;
});

var buttonParams = {
  classes: ['btn'],
  parent: document.getElementById('controller'),
  id: 'btnAddAtm',
  element: 'button',
  content: 'Add ATM'
};
var buttonComponent = new ButtonComponent(buttonParams);

var inputComponents = Array(2)
  .fill(null)
  .map(function(el, index) {
    var inputParams = {
      classes: ['range'],
      parent: document.getElementById('controller'),
      id: uniqid(),
      element: 'input',
      content: '',
      value: index == 0 ? 2 : 4
    };
    return new InputComponent(inputParams);
  });

document.getElementById(inputComponents[0].params.id).addEventListener('change', function(event) {
  var min = event.target.value * 1000;
  var max = event.target.nextSibling.nextSibling.value * 1000;
  clearTimeout(timerId.timer);
  utils.queueGenerator(queue, min, max, timerId);
});

document.getElementById(inputComponents[1].params.id).addEventListener('change', function(event) {
  var min = event.target.value * 1000;
  var max = event.target.previousSibling.previousSibling.value * 1000;
  clearTimeout(timerId.timer);
  utils.queueGenerator(queue, min, max, timerId);
});

document.getElementById('view').addEventListener('click', function(event) {
  var target = event.target;
  if (target.tagName === 'SPAN') {
    for (var i = 0, length = atms.length; i < length; i++) {
      if (atms[i].id === target.closest('div').id && atms[i].isFree) {
        target.closest('div').remove();
        atms.splice(i, 1);
        atmComponents.splice(i, 1);
        break;
      }
    }
  }
});

document.getElementById('btnAddAtm').addEventListener('click', function() {
  createNewAtm();
});

subscribeToAtm(0);
eventEmitter.on('free', utils.findFreeAtm.bind(null, atms, queue));
queue.on('add', utils.findFreeAtm.bind(null, atms, queue));
queue.on('add', queueComponent.updateParams.bind(queueComponent));
queue.on('remove', queueComponent.updateParams.bind(queueComponent));
queue.on('add', getQueueLength);
queue.on('add', stopTimer);
queue.on('remove', startTimer);

utils.queueGenerator(queue, 2000, 4000, timerId);

function makeAtmParams(atm, i) {
  return {
    classes: ['rect', 'atm'],
    content: atm.count,
    parent: document.getElementById('view'),
    id: atms[i].id,
    element: 'div'
  };
}

function subscribeToAtm(lastIndex) {
  for (var i = lastIndex; i < atms.length; i++) {
    atms[i].on('busy', atmComponents[i].updateParams.bind(atmComponents[i]));
    atms[i].on('busy', atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'atm', 'red'] }));
    atms[i].on('free', atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'atm', 'green'] }));
    atms[i].on('busy', atmComponents[i].hideCross.bind(atmComponents[i]));
    atms[i].on('free', atmComponents[i].showCross.bind(atmComponents[i]));
  }
}

function createNewAtm() {
  atms.push(new Atm());
  var index = atms.length - 1;
  atmComponents.push(new AtmComponent(makeAtmParams(atms[index], index)));
  subscribeToAtm(index);
}

function deleteLastAtm() {
  if (atms.length > 1) {
    var elems = document.querySelectorAll('.atm');
    var lastIndex = elems.length - 1;
    elems[lastIndex].remove();
    atms.splice(lastIndex, 1);
    atmComponents.splice(lastIndex, 1);
  }
}

function startTimer() {
  tmrId = setTimeout(function() {
    deleteLastAtm();
  }, 4000);
}

function stopTimer() {
  clearTimeout(tmrId);
}

function getQueueLength() {
  new Promise(function(resolve, reject) {
    if (queue.count === 10) {
      resolve();
    }
  }).then(function() {
    createNewAtm();
  });
}
