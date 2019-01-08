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

module.exports.randomInteger = randomInteger;
module.exports.queueGenerator = queueGenerator;
