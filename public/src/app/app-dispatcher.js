var assign = require('object-assign');
var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = assign(new Dispatcher(), {

  handleAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
