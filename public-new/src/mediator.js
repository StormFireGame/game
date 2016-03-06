import { EventEmitter } from 'events';

export default Object.assign(new EventEmitter(), {
  currentHero: null,
});
