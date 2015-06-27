import IslandActions from '../actions/island-actions';
import IslandService from '../services/island-service';

export default {

  fetch() {
    IslandService.fetch()
      .then((response) => {
        IslandActions.receive(response);
      });
  }

};
