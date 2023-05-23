import { EventEmitter } from 'node:events';

const event = new EventEmitter();

const eventOla = (message: string, name: string) => {
  console.log(1, message, name);
};

const eventOla2 = (message: string, name: string) => {
  console.log(1, message, name);
};

// Fica recebendo evendo toda hora que ele é emitido
event.addListener('ola', eventOla);
event.on('ola', eventOla2);

// Recebe apenas 1x o evento e não recebe mais
// event.once('ola', eventOla);

setInterval(() => {
  console.log('Contador', event.listenerCount('ola'));
  event.emit('ola', 'Deu bom!', 'Dener');
  // event.removeListener('ola', eventOla);
  event.removeAllListeners('ola');
}, 1000);
