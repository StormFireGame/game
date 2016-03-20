import {
  RECIEVE_HERO,
  CHANGE_HERO,
  SAVE_GENERAL_HERO,
  REMOVE_THING,
  DRESS_OR_UNDRESS_THING,
  UNDRESS_THINGS,
  SAVE_COMPLECT,
  REMOVE_COMPLECT,
  APPLY_COMPLECT,
} from '../constants/AppConstants';
import { assignToEmpty } from '../lib/utils';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANGE_HERO:
    case RECIEVE_HERO:
    case SAVE_GENERAL_HERO:
    case REMOVE_THING:
    case DRESS_OR_UNDRESS_THING:
    case UNDRESS_THINGS:
    case SAVE_COMPLECT:
    case REMOVE_COMPLECT:
    case APPLY_COMPLECT:
      return assignToEmpty(state, action.hero);
    default:
      return state;
  }
};
