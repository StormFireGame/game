import { CHANGE_PROJECT_NAME } from '../constants/AppConstants';

export function changeProjectName(name) {
  return { type: CHANGE_PROJECT_NAME, name };
}

export function asyncChangeProjectName(name) {
  return (dispatch) => {
    return dispatch(changeProjectName(name));
  };
}
