import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  loading: false,
  error: null,
  path: null,
  isPatientImageUploaded: false,
};

const createProfileStarted = (state) => {
  return updateObject(state, { loading: true });
};

const createProfileSuccessful = (state) => {
  return updateObject(state, { loading: false });
};

const createProfileFailed = (state) => {
  return updateObject(state, { loading: false });
};

const setRedirectPath = (state, action) => {
  return updateObject(state, { path: action.path });
};

const checkPatientImageUpload = (state) => {
  return updateObject(state, { isPatientImageUploaded: true });
};

const resetPatientImageUpload = (state) => {
  return updateObject(state, { isPatientImageUploaded: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_HW_PROFILE_START:
      return createProfileStarted(state);
    case actionTypes.CREATE_HW_PROFILE_SUCCESS:
      return createProfileSuccessful(state);
    case actionTypes.CREATE_HW_PROFILE_FAIL:
      return createProfileFailed(state);
    case actionTypes.SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    case actionTypes.CHECK_PATIENT_IMAGE_UPLOAD:
      return checkPatientImageUpload(state);
    case actionTypes.RESET_PATIENT_IMAGE_UPLOAD:
      return resetPatientImageUpload(state);
    default:
      return state;
  }
};

export default reducer;
