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
  for (var i = 0; i < atms.length; i++) {
    if (atms[i].isFree && queue.count > 0) {
      queue.remove();
      atms[i].isFree = false;
      setTimeout(function() {
        atms[i].makeBusy();
      }, 1000);
      break;
    }
  }
}

module.exports.randomInteger = randomInteger;
module.exports.queueGenerator = queueGenerator;
module.exports.findFreeAtm = findFreeAtm;
