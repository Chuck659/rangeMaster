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
  TARGET_STATUS_UPDATE_START,
  TARGET_DATA_UPDATE_START,
  TARGET_STATUS_UPDATE_COMPLETE,
  TARGET_DATA_UPDATE_COMPLETE,
  TARGET_REMOVE,
  TARGET_RESET,
  TARGET_RUN,
  TARGET_EXEC_FUNCTION,
  TARGET_NETWORK_ERROR
} from './actions/types';
import { networkError } from './actions';
import Debug from './Debug';

function* fetchTargets(action) {
  try {
    console.log(`fetchTargets saga: ${action.type}`);
    const targets = yield call(() => AsyncStorage.getItem('targets'));
    console.log(`fetchTargets: ${targets}`);
    yield put({ type: TARGET_FETCH_SUCCEEDED, payload: JSON.parse(targets) });
  } catch (e) {
    console.log(`catch ${e.message}`);
    yield put({ type: TARGET_FETCH_FAILED, payload: e.message });
  }
}

function* fetchSaga() {
  console.log(`fetchSaga: ${TARGET_FETCH_REQUESTED}`);
  Debug.log(`fetchSaga: ${TARGET_FETCH_REQUESTED}`);
  yield takeEvery(TARGET_FETCH_REQUESTED, fetchTargets);
}

const getTargets = state => state.targets;

function* saveTargets(action) {
  try {
    const targets = yield select(getTargets);
    console.log(`saveTargets: ${JSON.stringify(targets)}`);
    yield call(() => AsyncStorage.setItem('targets', JSON.stringify(targets)));
  } catch (e) {
    console.log(`saveTargets: ${e}`);
  }
}

function* saveSaga() {
  yield takeEvery(TARGET_CREATE, saveTargets);
}

function* removeSaga() {
  yield takeEvery(TARGET_REMOVE, saveTargets);
}

function* updateStatus() {
  const targets = yield select(getTargets);
  // console.log(`updateStatus: ${JSON.stringify(targets)}`);

  // Cannot use forEach because yield
  for (let i = 0; i < targets.length; i++) {
    let t = targets[i];
    try {
      // console.log(`fetch: http://${t.address}/status`);
      const data = yield call(() =>
        fetch(`http://${t.address}/status`)
          .then(res => res.json())
          .then(json => ({
            type: TARGET_STATUS_UPDATE_COMPLETE,
            payload: { ...t, status: json.status }
          }))
          .catch(() => networkError(t))
      );
      yield put(data);
    } catch (e) {
      Debug.log(e.message);
      yield put(networkError(t));
    }
  }
}

function* updateStatusSaga() {
  // console.log(`updateStatusSaga : ${TARGET_STATUS_UPDATE_START}`);
  yield takeLatest(TARGET_STATUS_UPDATE_START, updateStatus);
}

function* updateData() {
  const targets = yield select(getTargets);
  // console.log(`updateStatus: ${JSON.stringify(targets)}`);

  // Cannot use forEach because yield
  for (let i = 0; i < targets.length; i++) {
    let t = targets[i];
    try {
      const data = yield call(() =>
        fetch(`http://${t.address}/hitData`).then(res => res.json())
      );
      if (data.data.length > 0) {
        console.log('here: ' + JSON.stringify(data));
      }
      yield put({
        type: TARGET_DATA_UPDATE_COMPLETE,
        payload: { ...t, text: data.data }
      });
    } catch (e) {
      // console.log(e.message);
    }
  }
}

function* updateDataSaga() {
  // console.log(`updateDataSaga : ${TARGET_STATUS_UPDATE_START}`);
  yield takeLatest(TARGET_DATA_UPDATE_START, updateData);
}

function* resetTarget(action) {
  const targets = yield select(getTargets);
  console.log(action);
  console.log(targets);
  const target = targets.filter(t => t.name == action.payload)[0];
  if (target) {
    try {
      yield call(() => {
        fetch(`http://${target.address}/reset`).then(res => res.json());
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

function* resetSaga() {
  yield takeEvery(TARGET_RESET, resetTarget);
}

function* runTarget(action) {
  const targets = yield select(getTargets);
  console.log(action);
  console.log(targets);
  const target = targets.filter(t => t.name == action.payload)[0];
  if (target) {
    const URL = `http://${target.address}/start`;
    console.log(URL);
    try {
      yield call(() => {
        fetch(URL)
          .then(res => res.json())
          .catch(e => console.log(e));
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

function* runSaga() {
  yield takeEvery(TARGET_RUN, runTarget);
}

function* execTarget(action) {
  const targets = yield select(getTargets);
  console.log(action);
  console.log(targets);
  const target = targets.filter(t => t.name == action.payload.name)[0];
  if (target) {
    console.log(`http://${target.address}/${action.payload.func}`);
    try {
      yield call(() => {
        fetch(`http://${target.address}/${action.payload.func}`).then(res =>
          res.json()
        );
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

function* execSaga() {
  yield takeEvery(TARGET_EXEC_FUNCTION, execTarget);
}

export default function* rootSaga() {
  console.log(`rootSaga`);
  yield all([
    fetchSaga(),
    saveSaga(),
    removeSaga(),
    updateStatusSaga(),
    updateDataSaga(),
    resetSaga(),
    runSaga(),
    execSaga()
  ]);
}
