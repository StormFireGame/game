import Firebase from 'firebase';

import config from '../config';

class DB {
  constructor(path) {
    this.ref = new Firebase(path);
  }
}

let db;
if (!db) {
  db = new DB(config.fireBasePath);
}

export default db;
