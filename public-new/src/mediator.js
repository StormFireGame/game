import Firebase from 'firebase';
import { EventEmitter } from 'events';

import config from './config/index';

let db;

export default Object.assign(new EventEmitter(), {
  // TOOD: check how to remove this attr
  loggedInHero: false,
  db() {
    if (!db) db = new Firebase(config.firebasePath);
    return db;
  },
  storage: {},
  // TOOD: check how to move it another place
  //       maybe move it to reducers
  fechStorage() {
    return Promise.all([

      new Promise((resolve) => {
        this.db().child('tableExperience').on('value', (data) => {
          this.storage.tableExperience = data.val();
          resolve();
        });
      }),

      new Promise((resolve) => {
        this.db().child('skills').on('value', (data) => {
          this.storage.skills = data.val();
          resolve();
        });
      }),

    ]);
  },
});
