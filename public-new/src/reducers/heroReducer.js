import { RECIEVE_HERO, HERO_INCREASE_PARAMETER, HERO_CHANGED } from '../constants/AppConstants';
import { assignToEmpty } from '../lib/utils';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case HERO_CHANGED:
    case RECIEVE_HERO:
      return assignToEmpty(state, action.hero);
    case HERO_INCREASE_PARAMETER:
      return assignToEmpty(state, {
        [action.name]: state[action.name] + 1,
      });
    default:
      return state;
  }
};
