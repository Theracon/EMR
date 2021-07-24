import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  encounters: null,
  loading: false,
  error: null,
};

const fetchEncountersStart = (state) => {
  return updateObject(state, { loading: true });
};

const fetchEncountersSuccessful = (state, action) => {
  return updateObject(state, {
    loading: false,
    encounters: action.encounters,
  });
};

const fetchEncountersFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ENCOUNTERS_START:
      return fetchEncountersStart(state);
    case actionTypes.FETCH_ENCOUNTERS_SUCCESS:
      return fetchEncountersSuccessful(state, action);
    case actionTypes.FETCH_ENCOUNTERS_FAIL:
      return fetchEncountersFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
