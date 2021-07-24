import * as actionTypes from "../action-types/index";
import axiosInstance from "../../axios/index";

export const saveEncounterStart = () => {
  return { type: actionTypes.SAVE_ENCOUNTER_START };
};

export const saveEncounterSuccessful = (encounter) => {
  return { type: actionTypes.SAVE_ENCOUNTER_SUCCESS, encounter: encounter };
};

export const saveEncounterFailed = (error) => {
  return { type: actionTypes.SAVE_ENCOUNTER_FAIL, error: error };
};

export const saveEncounter = (encounter) => {
  return (dispatch) => {
    dispatch(saveEncounterStart());

    encounter.tier = "tier_1";

    axiosInstance
      .post("/encounters.json", encounter)
      .then((response) => {
        encounter.id = response.data.name;
        dispatch(saveEncounterSuccessful(encounter));
      })
      .catch((error) => {
        dispatch(saveEncounterFailed(error));
      });
  };
};

export const sendEncounterStart = () => {
  return { type: actionTypes.SEND_ENCOUNTER_START };
};

export const sendEncounterSuccessful = (encounter) => {
  return {
    type: actionTypes.SEND_ENCOUNTER_SUCCESS,
    encounter,
  };
};

export const sendEncounterFailed = (error) => {
  return { type: actionTypes.SEND_ENCOUNTER_FAIL, error };
};

export const sendEncounter = (encounter, receivers) => {
  return (dispatch) => {
    dispatch(sendEncounterStart());

    encounter.receivers = receivers;
    encounter.tier = "tier_2";

    axiosInstance
      .post("/encounters.json", encounter)
      .then((response) => {
        encounter.id = response.data.name;
        dispatch(sendEncounterSuccessful(encounter));
      })
      .catch((error) => {
        dispatch(saveEncounterFailed(error));
      });
  };
};

export const setReceivers = (receivers) => {
  return { type: actionTypes.SET_RECEIVERS, receivers };
};

export const setEncounterSentStatus = () => {
  return { type: actionTypes.SET_ENCOUNTER_SENT_STATUS };
};
