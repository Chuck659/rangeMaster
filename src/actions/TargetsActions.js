import { AsyncStorage } from 'react-native';
import {
  TARGET_FETCH_REQUESTED,
  TARGET_UPDATE_START,
  TARGET_REMOVE,
  TARGET_RESET,
  TARGET_RUN
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

export const runTarget = name => ({
  type: TARGET_RUN,
  payload: name
});

export const updateTargets = () => ({
  type: TARGET_UPDATE_START
});
