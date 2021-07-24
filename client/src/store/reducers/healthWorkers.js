import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  healthWorkers: null,
  loading: false,
  error: null,
};

const getHealthWorkersStart = (state) => {
  return updateObject(state, { loading: true });
};

const getHealthWorkersSuccessful = (state, action) => {
  return updateObject(state, {
    healthWorkers: action.healthWorkers,
    loading: false,
  });
};

const getHealthWorkersFailed = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HW_START:
      return getHealthWorkersStart(state);
    case actionTypes.GET_HW_SUCCESS:
      return getHealthWorkersSuccessful(state, action);
    case actionTypes.GET_HW_FAIL:
      return getHealthWorkersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
