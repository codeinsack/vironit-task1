var queue = new Queue();
var atm1 = new Atm();
var atm2 = new Atm();

var mainComponent = new MainComponent();
var queueComponent = new QueueComponent();
var atm1Component = new AtmComponent();
var atm2Component = new AtmComponent();
var btnAddAtm = new AddAtmButton();

btnAddAtm.btnElement.addEventListener('click', function() {
  var atmComponent = new AtmComponent();
  var atm = new Atm();
  queue.addAtm(atm);
  subscribeToAtm(atm, atmComponent);
});

subscribeToAtm(atm1, atm1Component);
subscribeToAtm(atm2, atm2Component);

queue.on('addPerson', queueComponent.incrementQueue.bind(queueComponent));
queue.on('removePerson', queueComponent.decrementQueue.bind(queueComponent));

queue.addAtm(atm1);
queue.addAtm(atm2);

queueGenerator(queue);

function subscribeToAtm(atm, atmComponent) {
  atm.on('free', queue.sendPersonToAtm.bind(queue, atm));
  atm.on('free', mainComponent.setColorGreen.bind(mainComponent, atm, atmComponent.elementAtm));
  atm.on('busy', mainComponent.setColorRed.bind(mainComponent, atm, atmComponent.elementAtm));
  atm.on('busy', atmComponent.incrementAtm.bind(atmComponent, atm, atmComponent.elementAtm));
}
