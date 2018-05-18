import {
  TARGET_FETCH_SUCCEEDED,
  TARGET_FETCH_FAILED,
  TARGET_UPDATE,
  TARGET_CREATE,
  TARGET_STATUS_UPDATE_COMPLETE
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  console.log(
    `Targets Reducer: ${JSON.stringify(action)}, ${JSON.stringify(state)}`
  );
  switch (action.type) {
    case TARGET_FETCH_SUCCEEDED:
      if (!action.payload) {
        return [];
      } else {
        return JSON.parse(action.payload).map(target => ({
          ...target,
          status: 'Unknown'
        }));
      }
    case TARGET_STATUS_UPDATE_COMPLETE:
      return state;
    case TARGET_CREATE:
      return state.concat([action.payload]);
    default:
      return state;
  }
};
