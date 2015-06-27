import SkillActions from '../actions/skill-actions';
import SkillService from '../services/skill-service';

export default {

  fetch() {
    SkillService.fetch()
      .then((response) => {
        SkillActions.receive(response);
      });
  }

};
