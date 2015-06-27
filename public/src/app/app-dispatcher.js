import assign from 'object-assign';
import { Dispatcher } from 'flux';

export default assign(new Dispatcher(), {

  handleAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});
