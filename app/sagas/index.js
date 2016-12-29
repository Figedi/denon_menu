import denonSaga from './denon';

export default function* rootSaga() {
  yield [
    denonSaga(),
  ];
}
