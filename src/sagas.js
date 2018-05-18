import {
  call,
  put,
  takeEvery,
  takeLatest,
  all,
  select
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import {
  TARGET_FETCH_REQUESTED,
  TARGET_FETCH_SUCCEEDED,
  TARGET_FETCH_FAILED,
  TARGET_CREATE,
  TARGET_STATUS_UPDATE_START
} from './actions/types';

function* fetchTargets(action) {
  try {
    const targets = yield call(AsyncStorage.getItem, 'targets');
    console.log(`fetchTargets: ${targets}`);
    yield put({ type: TARGET_FETCH_SUCCEEDED, payload: targets });
  } catch (e) {
    yield put({ type: TARGET_FETCH_FAILED, payload: e.message });
  }
}

function* fetchSaga() {
  console.log(`fetchSaga: ${TARGET_FETCH_REQUESTED}`);
  yield takeEvery(TARGET_FETCH_REQUESTED, fetchTargets);
}

const getTargets = state => state.targets;

function* saveTargets(action) {
  try {
    const targets = yield select(getTargets);
    yield call(AsyncStorage.setItem, 'targets', targets);
  } catch (e) {
    console.log(`saveTargets: ${e}`);
  }
}

function* saveSaga() {
  yield takeEvery(TARGET_CREATE, saveTargets);
}

function* updateStatus() {
  const targets = yield select(getTargets);
  targets.forEach(t => console.log(t.name));
}

function* updateStatusSaga() {
  yield takeLatest(TARGET_STATUS_UPDATE_START, updateStatus);
}

export default function* rootSaga() {
  console.log(`rootSaga`);
  yield all([fetchSaga(), saveSaga(), updateStatusSaga()]);
}
