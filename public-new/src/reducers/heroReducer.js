import { RECIEVE_HERO, CHANGE_HERO, SAVE_GENERAL_HERO } from '../constants/AppConstants';
import { assignToEmpty } from '../lib/utils';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANGE_HERO:
    case RECIEVE_HERO:
    case SAVE_GENERAL_HERO:
      return assignToEmpty(state, action.hero);
    default:
      return state;
  }
};
