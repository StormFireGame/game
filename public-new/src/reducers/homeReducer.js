import { CHANGE_PROJECT_NAME } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  projectName: 'Game',
};

function homeReducer(state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
  case CHANGE_PROJECT_NAME:
    return assignToEmpty(state, {
      projectName: action.name,
    });
  default:
    return state;
  }
}

export default homeReducer;
