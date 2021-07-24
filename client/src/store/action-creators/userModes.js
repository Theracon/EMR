import * as actionTypes from "../action-types/index";

export const switchToPatientUserMode = () => {
  return { type: actionTypes.PATIENT_USER_MODE };
};

export const switchToHWUserMode = () => {
  return { type: actionTypes.HW_USER_MODE };
};
