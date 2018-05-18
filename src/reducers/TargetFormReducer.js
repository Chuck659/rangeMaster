import {
  TARGET_FORM_UPDATE,
  TARGET_FORM_RESET,
  TARGET_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  address: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case TARGET_FORM_UPDATE:
      const { prop, value } = action.payload;
      return { ...state, [prop]: value };
    case TARGET_FORM_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
