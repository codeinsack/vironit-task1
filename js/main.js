var queue = new Queue();
var atm1 = new Atm('atm1');
var atm2 = new Atm('atm2');

atm1.on('free', queue.update.bind(this, atm1));
// atm2.on('free', queue.update.bind(this, atm2));

atm1.emit('free');
atm2.emit('free');

// queueGenerator(queue);
