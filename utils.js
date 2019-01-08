function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function queueGenerator(queue) {
  setTimeout(function() {
    queue.addPerson();
    queueGenerator(queue);
  }, randomInteger(1000, 2000));
}
