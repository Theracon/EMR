import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  userType: "hw",
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authenticationStarted = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const authenticationSuccessful = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authenticationFailed = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const switchUserTypeToPatient = (state) => {
  return updateObject(state, { userType: "p" });
};

const switchUserTypeToHW = (state) => {
  return updateObject(state, { userType: "hw" });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authenticationStarted(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authenticationSuccessful(state, action);
    case actionTypes.AUTH_FAIL:
      return authenticationFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SWITCH_USER_TYPE_TO_PATIENT:
      return switchUserTypeToPatient(state);
    case actionTypes.SWITCH_USER_TYPE_TO_HW:
      return switchUserTypeToHW(state);
    default:
      return state;
  }
};

export default reducer;
