function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function queueGenerator(queue, min, max, timer) {
  timer.id = setTimeout(function() {
    queue.add();
    queueGenerator(queue, min, max, timer);
  }, randomInteger(min * 1000, max * 1000));
}

function findFreeAtm(atmComponents, queueComponent) {
  var freeAtmComponent = atmComponents.find(function(atmComponent) {
    return atmComponent.atm.isFree && queueComponent.queue.count > 0;
  });
  if (freeAtmComponent) {
    freeAtmComponent.atm.isFree = false;
    queueComponent.queue.count--;
    setTimeout(function() {
      queueComponent.queue.remove();
      freeAtmComponent.atm.makeBusy();
    }, 1000);
  }
}

function subscribeATMs(atmComponents, queueComponent, i) {
  if (!i) {
    atmComponents.forEach(function(atmComponent) {
      atmComponent.atm.on('busy', atmComponent.updateParams.bind(atmComponent));
      atmComponent.atm.on('busy', atmComponent.updateParams.bind(atmComponent, { classes: ['rect', 'atm', 'red'] }));
      atmComponent.atm.on('free', findFreeAtm.bind(null, atmComponents, queueComponent));
      atmComponent.atm.on('free', atmComponent.updateParams.bind(atmComponent, { classes: ['rect', 'atm'] }));
      atmComponent.atm.on('busy', atmComponent.hideCross.bind(atmComponent));
      atmComponent.atm.on('free', atmComponent.showCross.bind(atmComponent));
    });
  } else {
    atmComponents[i].atm.on('busy', atmComponents[i].updateParams.bind(atmComponents[i]));
    atmComponents[i].atm.on(
      'busy',
      atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'atm', 'red'] })
    );
    atmComponents[i].atm.on('free', findFreeAtm.bind(null, atmComponents, queueComponent));
    atmComponents[i].atm.on('free', atmComponents[i].updateParams.bind(atmComponents[i], { classes: ['rect', 'atm'] }));
    atmComponents[i].atm.on('busy', atmComponents[i].hideCross.bind(atmComponents[i]));
    atmComponents[i].atm.on('free', atmComponents[i].showCross.bind(atmComponents[i]));
  }
}

module.exports.randomInteger = randomInteger;
module.exports.queueGenerator = queueGenerator;
module.exports.findFreeAtm = findFreeAtm;
module.exports.subscribeATMs = subscribeATMs;
