// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import denon from './denon';
import config from './config';

const rootReducer = combineReducers({
  routing,
  denon,
  config,
});

export default rootReducer;
