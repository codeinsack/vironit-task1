var utils = require('./core/utils');
var Atm = require('./core/atm');
var Queue = require('./core/queue');
var QueueComponent = require('./components/queue');
var AtmComponent = require('./components/atm');

var queue = new Queue();
var atms = [new Atm(), new Atm()];

var queueHtml = `<div id={{id}} class="{{class}}">{{count}}</div>`;
var queueParams = {
  classes: ['rect', 'queue'],
  count: queue.count,
  parent: document.body,
  id: 'queue'
};
var queueComponent = new QueueComponent(queueHtml, queueParams);

queue.on('add', queueComponent.updateParams.bind(queueComponent, queueParams));
queue.on('add', utils.findFreeAtm.bind(null, atms, queue));
atms.forEach(function(atm) {
  atm.on('free', utils.findFreeAtm.bind(null, atms, queue));
});

utils.queueGenerator(queue);
