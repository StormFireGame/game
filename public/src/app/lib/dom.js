'use strict';

module.exports = {
  on: function(el, type, callback) {
    if (el.length) {
      for(let i = 0; i < el.length; i++) {
        this.on(el[i], type, callback);
      }
    } else if (el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      el.attachEvent('on' + type, callback.bind(el));
    }
  },
  off: function(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      el.detachEvent('on' + type, callback);
    }
  }
};
