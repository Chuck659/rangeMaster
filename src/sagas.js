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
  TARGET_DATA_UPDATE,
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

// let testPort = ":8080";
let testPort = '';

function* fetchTargets(action) {
  try {
    const targets = yield call(() => AsyncStorage.getItem('targets'));
    Debug.log(`fetchTargets: ${targets}`);
    yield put({ type: TARGET_FETCH_SUCCEEDED, payload: JSON.parse(targets) });
  } catch (e) {
    Debug.log(`catch ${e.message}`);
    yield put({ type: TARGET_FETCH_FAILED, payload: e.message });
  }
}

function* fetchSaga() {
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

/* update status is not used (update data returns status now)
function* updateStatus() {
  const targets = yield select(getTargets);
  try {
    // Cannot use forEach because yield
    for (let i = 0; i < targets.length; i++) {
      let t = targets[i];
      if (true) {
        try {
          // Debug.log(`fetch: http://${t.address}${testPort}/status`);
          let stime = new Date().getTime();
          const data = yield call(() =>
            fetch(`http://${t.address}${testPort}/status`)
              .then(res => res.json())
              .then(json => {
                return {
                  type: TARGET_STATUS_UPDATE_COMPLETE,
                  payload: { ...t, status: json.status }
                };
              })
              .catch(e => {
                Debug.log('catch: ' + e.message);
                networkError(t);
                return { type: 'dummy', payload: '' };
              })
          );

          // Debug.log(`updateStatus: ${new Date().getTime() - stime}`);
          yield put(data);
        } catch (e) {
          Debug.log('catch: ' + e.message);
          yield put(networkError(t));
        }
      }
    }
  } catch (e) {
    Debug.log(e.message);
  }
}

function* updateStatusSaga() {
  yield takeLatest(TARGET_STATUS_UPDATE_START, updateStatus);
}
*/

function* updateData(action) {
  const targets = yield select(getTargets);
  // Debug.log(`Action: ${JSON.stringify(action)}`);
  // Debug.log(`Targets: ${JSON.stringify(targets)}`);
  const target = targets.filter(t => t.name == action.payload)[0];
  if (!target) {
    Debug.log(`Unknown target: ${JSON.stringify(action)}`);
  }
  else {
    Debug.logIf(target.debug, `target: ${JSON.stringify(target)}`);
    try {
      Debug.logIf(
        target.debug,
        `==> http://${target.address}${testPort}/hitData`
      );
      const data = yield call(() =>
        fetch(`http://${target.address}${testPort}/hitData`)
          .then(res => {
            return res.json();
          })
          .then(json => ({ ...json, networkError: false }))
          .catch(e => {
            Debug.logIf(
              target.debug,
              `error on fetch :  ${JSON.stringify(e)} ${target.name}`
            );
            return { data: [], status: target.status, networkError: true };
          })
      );
      Debug.logIf(target.debug, `here: ${target.name} ` + JSON.stringify(data));
      yield put({
        type: TARGET_DATA_UPDATE_COMPLETE,
        payload: {
          ...target,
          status: data.status,
          text: data.data,
          networkError: data.networkError
        }
      });
    } catch (e) {
      Debug.logIf(target.debug, `Catch: ${JSON.stringify(e)}`);
      yield put({
        type: TARGET_DATA_UPDATE_COMPLETE,
        payload: { ...target, text: [] }
      });
    }
  }
}

function* updateDataSaga() {
  // console.log(`updateDataSaga : ${TARGET_STATUS_UPDATE_START}`);
  yield takeEvery(TARGET_DATA_UPDATE, updateData);
}

function* resetTarget(action) {
  const targets = yield select(getTargets);
  console.log(action);
  console.log(targets);
  const target = targets.filter(t => t.name == action.payload)[0];
  if (target) {
    try {
      yield call(() => {
        fetch(`http://${target.address}${testPort}/reset`).then(res =>
          res.json()
        );
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
    const URL = `http://${target.address}${testPort}/start`;
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
    console.log(`http://${target.address}${testPort}/${action.payload.func}`);
    try {
      yield call(() => {
        fetch(
          `http://${target.address}${testPort}/${action.payload.func}`
        ).then(res => res.json());
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
  Debug.log(`rootSaga`);
  yield all([
    fetchSaga(),
    saveSaga(),
    removeSaga(),
    // updateStatusSaga(),
    updateDataSaga(),
    resetSaga(),
    runSaga(),
    execSaga()
  ]);
}
