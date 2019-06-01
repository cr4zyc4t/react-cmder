import { takeEvery, all, fork, call } from "redux-saga/effects";
import { INCREASE } from "actions/counter";

function* helloSaga() {
  yield takeEvery(INCREASE, function* (actions) {
    // eslint-disable-next-line no-console
    yield call(console.log, "Catched!", actions);
  });
} // notice how we now only export the rootSaga
// single entry point to start all Sagas at once


export default function* rootSaga() {
  yield all([fork(helloSaga)]);
}