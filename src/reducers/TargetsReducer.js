import {
  TARGET_FETCH_SUCCEEDED,
  TARGET_FETCH_FAILED,
  TARGET_UPDATE,
  TARGET_CREATE,
  TARGET_REMOVE,
  TARGET_RESET,
  TARGET_STATUS_UPDATE_START,
  TARGET_DATA_UPDATE_START,
  TARGET_STATUS_UPDATE_COMPLETE,
  TARGET_DATA_UPDATE_COMPLETE,
  TARGET_NETWORK_ERROR
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  if (
    action.type != TARGET_STATUS_UPDATE_COMPLETE &&
    action.type != TARGET_DATA_UPDATE_COMPLETE &&
    action.type != TARGET_STATUS_UPDATE_START &&
    action.type != TARGET_DATA_UPDATE_START
  ) {
    console.log(
      `Targets Reducer: ${JSON.stringify(action)}, ${JSON.stringify(state)}`
    );
  }
  switch (action.type) {
    case TARGET_FETCH_SUCCEEDED:
      if (!action.payload) {
        return [];
      } else {
        return action.payload.map(target => ({
          ...target,
          status: 'Unknown',
          networkError: false,
          text: ''
        }));
      }

    case TARGET_STATUS_UPDATE_COMPLETE:
      return state.map(t => {
        if (t.name === action.payload.name) {
          return { ...t, status: action.payload.status, networkError: false };
        } else {
          return t;
        }
      });

    case TARGET_DATA_UPDATE_COMPLETE:
      return state.map(t => {
        if (t.name === action.payload.name) {
          return { ...t, text: action.payload.text };
        } else {
          return t;
        }
      });

    case TARGET_RESET:
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, status: 'unknown', text: '' };
        } else {
          return t;
        }
      });
    case TARGET_CREATE:
      return state.concat([action.payload]);

    case TARGET_REMOVE:
      return state.filter(t => t.name != action.payload);

    case TARGET_NETWORK_ERROR:
      return state.map(t => {
        if (t.name === action.payload.name) {
          return { ...t, networkError: true };
        } else {
          return t;
        }
      });
    default:
      return state;
  }
};
