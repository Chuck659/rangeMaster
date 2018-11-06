import {
  TARGET_FETCH_SUCCEEDED,
  TARGET_FETCH_FAILED,
  TARGET_UPDATE,
  TARGET_CREATE,
  TARGET_REMOVE,
  TARGET_RESET,
  TARGET_STATUS_UPDATE_START,
  TARGET_DATA_UPDATE_START,
  TARGET_DATA_UPDATE,
  TARGET_STATUS_UPDATE_COMPLETE,
  TARGET_DATA_UPDATE_COMPLETE,
  TARGET_DATA_CLEAR,
  TARGET_NETWORK_ERROR,
  TOGGLE_DISABLED,
  TOGGLE_DEBUG
} from '../actions/types';
import Debug from '../Debug';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  if (action.type == TOGGLE_DEBUG || action.type == TOGGLE_DISABLED) {
    Debug.log(
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
          status: 'unknown',
          networkError: false,
          polling: false,
          disabled: false,
          debug: false,
          text: []
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

    case TARGET_DATA_UPDATE_START:
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, polling: true };
        } else {
          return t;
        }
      });

    case TARGET_DATA_UPDATE_COMPLETE:
      return state.map(t => {
        if (t.name === action.payload.name) {
          let noBlankLines = action.payload.text.filter(t => t.length > 0);
          let networkError = action.payload.hasOwnProperty('networkError')
            ? action.payload.networkError
            : t.networkError;
          return {
            ...t,
            polling: false,
            status: action.payload.status,
            text: t.text ? t.text.concat(noBlankLines) : noBlankLines,
            networkError
          };
        } else {
          return t;
        }
      });

    case TARGET_DATA_CLEAR:
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, text: '' };
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
      Debug.log(`TARGET_NETWORK_ERROR : ${action.payload}`);
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, networkError: true, polling: false };
        } else {
          return t;
        }
      });

    case TOGGLE_DISABLED:
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, disabled: !t.disabled, polling: false };
        } else {
          return t;
        }
      });

    case TOGGLE_DEBUG:
      return state.map(t => {
        if (t.name === action.payload) {
          return { ...t, debug: !t.debug };
        } else {
          return t;
        }
      });

    default:
      return state;
  }
};
