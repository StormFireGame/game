import { EventEmitter } from 'events';
import assign from 'object-assign';

localStorage.setItem('accessToken', 'creator');
export default assign(new EventEmitter(), {
  accessToken: window.localStorage.getItem('accessToken'),
  currentUser: null,
  socket: null
});
