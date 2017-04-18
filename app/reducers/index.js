// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import type { Reducer } from 'redux';
import type { ReduxStandardAction } from '../actions';
import type { DenonState } from './denon';
import type { ConfigState } from './config';

import denon from './denon';
import config from './config';

export type RootState = Reducer<{ config: ConfigState, denon: DenonState, routing: any }, ReduxStandardAction>;

const rootReducer: RootState = combineReducers({
  routing,
  denon,
  config,
});

export default rootReducer;
