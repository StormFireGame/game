import { RECIEVE_HERO, HERO_INCREASE_PARAMETER } from '../constants/AppConstants';
import { assignToEmpty } from '../lib/utils';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
  case RECIEVE_HERO:
    return assignToEmpty(state, action.data);
  case HERO_INCREASE_PARAMETER:
    return assignToEmpty(state, {
      [action.name]: state[action.name] + 1,
    });
  default:
    return state;
  }
};
