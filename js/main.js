var queue = new Queue();
var atm1 = new Atm('atm1');
var atm2 = new Atm('atm2');
var component = new Component();

atm1.on('free', queue.sendPersonToAtm.bind(queue, atm1));
atm1.on('free', component.setColorGreen.bind(component, atm1));
atm1.on('busy', component.setColorRed.bind(component, atm1));
atm1.on('busy', component.incrementAtm.bind(component, atm1));

atm2.on('free', queue.sendPersonToAtm.bind(queue, atm2));
atm2.on('free', component.setColorGreen.bind(component, atm2));
atm2.on('busy', component.setColorRed.bind(component, atm2));
atm2.on('busy', component.incrementAtm.bind(component, atm2));

queue.on('addPerson', component.incrementQueue.bind(component));
queue.on('removePerson', component.decrementQueue.bind(component));

queue.addAtm(atm1);
queue.addAtm(atm2);

queueGenerator(queue);
