import * as actionTypes from "../action-types/index";

const initialState = {
  userMode: "hw",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_USER_MODE:
      return { userMode: "patient" };
    case actionTypes.HW_USER_MODE:
      return { userMode: "hw" };
    default:
      return state;
  }
};

export default reducer;
