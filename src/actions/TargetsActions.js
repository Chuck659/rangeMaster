import { AsyncStorage } from 'react-native';
import {
  TARGET_FETCH_REQUESTED,
  TARGET_STATUS_UPDATE_START,
  TARGET_DATA_UPDATE_START,
  TARGET_DATA_UPDATE,
  TARGET_DATA_CLEAR,
  TARGET_REMOVE,
  TARGET_RESET,
  TARGET_RUN,
  TARGET_EXEC_FUNCTION,
  TARGET_NETWORK_ERROR
} from './types';

export const fetchTargets = () => ({
  type: TARGET_FETCH_REQUESTED
});

export const deleteTarget = name => ({
  type: TARGET_REMOVE,
  payload: name
});

export const resetTarget = name => ({
  type: TARGET_RESET,
  payload: name
});

export const clearTargetData = name => ({
  type: TARGET_DATA_CLEAR,
  payload: name
});

export const runTarget = name => ({
  type: TARGET_RUN,
  payload: name
});

export const updateStatus = () => ({
  type: TARGET_STATUS_UPDATE_START
});

// export const updateData = () => ({
//   type: TARGET_DATA_UPDATE_START
// });

export const updateDataStart = name => ({
  type: TARGET_DATA_UPDATE_START,
  payload: name
})

export const updateData = name => ({
  type: TARGET_DATA_UPDATE,
  payload: name
})

export const executeFunction = (name, func) => ({
  type: TARGET_EXEC_FUNCTION,
  payload: { name, func }
});

export const networkError = target => ({
  type: TARGET_NETWORK_ERROR,
  payload: target.name
});
