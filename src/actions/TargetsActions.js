import { AsyncStorage } from 'react-native';
import { TARGET_FETCH_REQUESTED, TARGET_STATUS_UPDATE_START } from './types';

export const fetchTargets = () => ({
  type: TARGET_FETCH_REQUESTED
});

export const updateTargetsStatus = () => ({
  type: TARGET_STATUS_UPDATE_START
});
