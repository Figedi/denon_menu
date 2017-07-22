import { all, call } from 'redux-saga/effects';
import denonSaga from './denon';
import configSaga from './config';

export default function* rootSaga() {
  yield all([call(denonSaga), call(configSaga)]);
}
