import { call, select, take, fork, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/constants';

import { CONFIG_ACTIONS, configSetFormField } from '../actions/config';
import { enable, disable, getState } from '../api/startup';

const getStartup = state => state.config.startup;

function* watchConfigChange() {
  while (true) {
    yield take(CONFIG_ACTIONS.commitForm);
    const startup = yield select(getStartup);
    if (startup) {
      yield call(enable);
    } else {
      yield call(disable);
    }
  }
}

function* watchRehydrate() {
  yield take(REHYDRATE);
  const startupState = yield call(getState);
  yield put(configSetFormField('startup', startupState));
}

export default function* root() {
  yield [fork(watchConfigChange), fork(watchRehydrate)];
}
