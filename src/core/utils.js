function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function queueGenerator(queue) {
  setTimeout(function() {
    queue.add();
    queueGenerator(queue);
  }, randomInteger(2000, 4000));
}

function findFreeAtm(atms, queue) {
  var freeAtm = atms.find(function(atm) {
    return atm.isFree && queue.count > 0;
  });

  if (freeAtm) {
    freeAtm.isFree = false;
    setTimeout(function() {
      queue.remove();
      freeAtm.makeBusy();
    }, 1000);
  }
}

module.exports.randomInteger = randomInteger;
module.exports.queueGenerator = queueGenerator;
module.exports.findFreeAtm = findFreeAtm;
