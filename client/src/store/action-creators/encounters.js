import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

const fetchEncountersStart = () => {
  return { type: actionTypes.FETCH_ENCOUNTERS_START };
};

const fetchEncountersSuccessful = (encounters, email) => {
  return { type: actionTypes.FETCH_ENCOUNTERS_SUCCESS, encounters, email };
};

const fetchEncountersFailed = (error) => {
  return { type: actionTypes.FETCH_ENCOUNTERS_FAIL, error };
};

export const fetchEncounters = () => {
  return (dispatch) => {
    dispatch(fetchEncountersStart());

    axiosInstance
      .get("/encounters.json")
      .then((response) => {
        const encounters = [];

        for (let key in response.data) {
          encounters.push({ id: key, ...response.data[key] });
        }

        localStorage.setItem("encounters", JSON.stringify(encounters));

        dispatch(fetchEncountersSuccessful(encounters));
      })
      .catch((error) => {
        dispatch(fetchEncountersFailed(error));
      });
  };
};
