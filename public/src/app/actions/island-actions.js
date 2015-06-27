import AppDispatcher from '../app-dispatcher';
import IslandConstants from '../constants/island-constants';

export default {
  receive(data) {
    AppDispatcher.handleAction({
      actionType: IslandConstants.ISLAND_RECEIVE,
      data: data
    });
  }
};
