import AppDispatcher from '../app-dispatcher';
import SkillConstants from '../constants/skill-constants';

export default {
  receive(data) {
    AppDispatcher.handleAction({
      actionType: SkillConstants.SKILLS_RECEIVE,
      data: data
    });
  }
};
