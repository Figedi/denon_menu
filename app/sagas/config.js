import { call, select, take, fork } from 'redux-saga/effects';

import { CONFIG_ACTIONS } from '../actions/config';
import { enable, disable } from '../api/startup';

const getStartup = (state) => state.config.startup;

function* watchConfigChange() {
  while (true) { // eslint-disable-line
    yield take(CONFIG_ACTIONS.commitForm);
    const startup = yield select(getStartup);
    if (startup) {
      yield call(enable);
    } else {
      yield call(disable);
    }
  }
}

export default function* root() {
  yield [
    fork(watchConfigChange),
  ];
}
