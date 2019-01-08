var utils = require('./core/utils');
var EventEmitter = require('./core/eventEmitter');
var Atm = require('./core/atm');
var Queue = require('./core/queue');
var QueueComponent = require('./components/queue');
var AtmComponent = require('./components/atm');

var queue = new Queue();
var atms = [new Atm(), new Atm()];

var queueHtml = `<div id="queue" class="rect queue">0</div>`;
var atmHtml1 = `<div class="rect atm atm1">0</div>`;
var atmHtml2 = `<div class="rect atm atm2">0</div>`;
var queueComponent = new QueueComponent('queue', queueHtml);
var atmComponents = [new AtmComponent('atm1', atmHtml1), new AtmComponent('atm2', atmHtml2)];

queue.on('add', findFreeAtm);
queue.on(
  'add',
  queueComponent.render.bind(queueComponent, 'queue', `<div id='queue' class="rect queue">${queue.count}</div>`)
);

atms.forEach(function(atm) {
  atm.on('free', queue.add.bind(queue, atm));
});
// debugger;
utils.queueGenerator(queue);

function findFreeAtm() {
  for (var i = 0; i < atms.length; i++) {
    if (atms[i].isFree && queue.count > 0) {
      atms[i].makeBusy();
      setTimeout(function() {
        queue.remove();
      }, 1000);
      break;
    }
  }
}
