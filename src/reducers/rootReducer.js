import { combineReducers } from 'redux';

import heroReducer from './heroReducer';

const rootReducer = combineReducers({ hero: heroReducer });

export default rootReducer;
