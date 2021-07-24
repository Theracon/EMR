import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  encounter: null,
  receivers: [],
  encounterSent: false,
  loading: false,
  error: null,
};

const saveEncounterStart = (state) => {
  return updateObject(state, { loading: true, encounterSent: false });
};

const saveEncounterSuccessful = (state, action) => {
  return updateObject(state, {
    loading: false,
    encounter: action.encounter,
    encounterSent: false,
  });
};

const saveEncounterFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    encounterSent: false,
  });
};

const sendEncounterStart = (state) => {
  return updateObject(state, { loading: true, encounterSent: false });
};

const sendEncounterSuccessful = (state, action) => {
  return updateObject(state, {
    loading: false,
    encounter: action.encounter,
    encounterSent: true,
  });
};

const sendEncounterFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    encounterSent: false,
  });
};

const setReceivers = (state, action) => {
  return updateObject(state, { receivers: action.receivers });
};

const setEncounterSentStatus = (state) => {
  return updateObject(state, { encounterSent: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ENCOUNTER_START:
      return saveEncounterStart(state);
    case actionTypes.SAVE_ENCOUNTER_SUCCESS:
      return saveEncounterSuccessful(state, action);
    case actionTypes.SAVE_ENCOUNTER_FAIL:
      return saveEncounterFail(state, action);
    case actionTypes.SEND_ENCOUNTER_START:
      return sendEncounterStart(state);
    case actionTypes.SEND_ENCOUNTER_SUCCESS:
      return sendEncounterSuccessful(state, action);
    case actionTypes.SEND_ENCOUNTER_FAIL:
      return sendEncounterFail(state, action);
    case actionTypes.SET_RECEIVERS:
      return setReceivers(state, action);
    case actionTypes.SET_ENCOUNTER_SENT_STATUS:
      return setEncounterSentStatus(state);
    default:
      return state;
  }
};

export default reducer;
