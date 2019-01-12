var utils = require('./core/utils');
var Atm = require('./core/atm');
var Queue = require('./core/queue');
var QueueComponent = require('./components/queue');
var AtmComponent = require('./components/atm');
var ButtonComponent = require('./components/button');
var EventEmitter = require('./core/eventEmitter');

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
  parent: document.getElementById('container'),
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
  parent: document.body,
  id: 'btnAddAtm',
  element: 'button',
  content: 'Add ATM'
};
var buttonComponent = new ButtonComponent(buttonParams);

document.getElementById('container').addEventListener('click', function(event) {
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
  atms.push(new Atm());
  var index = atms.length - 1;
  atmComponents.push(new AtmComponent(makeAtmParams(atms[index], index)));
  subscribeToAtm(index);
});

subscribeToAtm(0);
eventEmitter.on('free', utils.findFreeAtm.bind(null, atms, queue));
queue.on('add', utils.findFreeAtm.bind(null, atms, queue));
queue.on('add', queueComponent.updateParams.bind(queueComponent));
queue.on('remove', queueComponent.updateParams.bind(queueComponent));
utils.queueGenerator(queue);

function makeAtmParams(atm, i) {
  return {
    classes: ['rect', 'atm'],
    content: atm.count,
    parent: document.getElementById('container'),
    id: atms[i].id,
    element: 'div'
  };
}

function subscribeToAtm(lastIndex) {
  for (var i = lastIndex; i < atms.length; i++) {
    atms[i].on('busy', atmComponents[i].updateParams.bind(atmComponents[i]));
    atms[i].on('busy', atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'queue', 'red'] }));
    atms[i].on('free', atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'queue', 'green'] }));
    atms[i].on('hideCross', hideCross.bind(null, atms[i]));
    atms[i].on('showCross', showCross.bind(null, atms[i]));
  }
}

function hideCross(atm) {
  document.getElementById(atm.id).getElementsByTagName('span')[0].style.display = 'none';
}

function showCross(atm) {
  document.getElementById(atm.id).getElementsByTagName('span')[0].style.display = 'block';
}
