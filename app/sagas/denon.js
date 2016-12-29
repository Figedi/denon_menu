import { call, select, take, fork, put, cancel, cancelled, race, actionChannel } from 'redux-saga/effects';
import { buffers, delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist/constants';
import { denon as denonApi } from '../api';
import { DENON_ACTIONS, actions } from '../actions/denon';
import { promiseHelpers } from '../utils';

const CONSTANTS = promiseHelpers.getPendingSymbols(DENON_ACTIONS);

const getHost = (state) => state.config.ip;
const getRehydrateTimeout = (state) => state.config.rehydrateTimeout;

const MAX_ERRORS = 5;

let denonChannel;

const watchedActions = Object.keys(DENON_ACTIONS)
  .filter((k) => k.indexOf('Interval') < 0 && k.indexOf('error') < 0 && k.indexOf('commitVolume') < 0)
  .map((k) => DENON_ACTIONS[k]);

function* watchRequests() {
  denonChannel = yield actionChannel(watchedActions, buffers.sliding(5));
  let errors = 0;
  let lastError;
  while (errors < MAX_ERRORS) {
    // 2- take from the channel
    const { payload } = yield take(denonChannel);
    // 3- Note that we're using a blocking call
    const { error } = yield call(handleRequest, payload);
    if (error) {
      errors += 1;
      lastError = error;
    }
  }
  yield put(actions.denonError(lastError));
}

function* handleRequest(payload) {
  const { method, args } = payload;
  if (!method) {
    return {};
  }
  const sanitizedMethod = method.replace(/^denon/, '');
  yield put({ type: CONSTANTS[sanitizedMethod].pending, payload });
  let error;
  let response;
  try {
    response = yield call(denonApi[sanitizedMethod], ...args);
  } catch (e) {
    error = e;
  }
  if (error) {
    yield put({ type: CONSTANTS[sanitizedMethod].rejected, payload: { ...payload, error } });
  } else {
    yield put({ type: CONSTANTS[sanitizedMethod].fulfilled, payload: { ...payload, response } });
  }
  return { error, response };
}

function* rehydrate(host: string, withPower: boolean = true) {
  if (!host) {
    return;
  }
  if (withPower) {
    yield put(actions.denonGetPower(host));
  }
  yield put(actions.denonGetVolume(host));
  yield put(actions.denonGetChannel(host));
}

function* startRehydrateInterval() {
  const rehydrateTimeout = yield select(getRehydrateTimeout);
  try {
    while (true) { // eslint-disable-line
      const host = yield select(getHost);
      yield call(rehydrate, host, false);
      yield call(delay, rehydrateTimeout);
    }
  } finally {
    if (yield cancelled()) {
      // todo log
    }
  }
}

function* watchStart() {
  while (true) { // eslint-disable-line
    yield take(DENON_ACTIONS.startInterval);
    const rehydrateTask = yield fork(startRehydrateInterval);
    yield race({
      error: take(DENON_ACTIONS.error),
      stop: take(DENON_ACTIONS.stopInterval)
    });
    yield cancel(rehydrateTask);
  }
}
//
function* watchRehydrate() {
  const action = yield take(REHYDRATE);
  yield fork(rehydrate, action.payload.config.ip);
}

export default function* root() {
  yield [
    fork(watchRequests),
    fork(watchStart),
    fork(watchRehydrate),
  ];
}
