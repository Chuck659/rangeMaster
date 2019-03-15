import { TARGET_FORM_UPDATE, TARGET_FORM_RESET, TARGET_CREATE } from './types';

export const targetFormUpdate = ({ prop, value }) => {
  // console.log(`targetFormUpdate: ${prop}, ${value}`);
  return {
    type: TARGET_FORM_UPDATE,
    payload: { prop, value }
  };
};

export const targetFormReset = () => ({ type: TARGET_FORM_RESET });

export const targetCreate = ({ name, address, status, command }) => {
  // console.log(`targetCreate: ${name}, ${address}, ${status}`);
  if (name && address) {
    return {
      type: TARGET_CREATE,
      payload: { name, address, status, command }
    };
  } else {
    return {
      type: 'error'
    };
  }
};
