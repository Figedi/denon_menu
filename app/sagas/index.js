import denonSaga from './denon';
import configSaga from './config';

export default function* rootSaga() {
  yield [
    denonSaga(),
    configSaga(),
  ];
}
