import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

export const getHWStarted = () => {
  return { type: actionTypes.GET_HW_START };
};

export const getHWSuccessful = (healthWorkers) => {
  return { type: actionTypes.GET_HW_SUCCESS, healthWorkers: healthWorkers };
};

export const getHWFailed = (error) => {
  return { type: actionTypes.GET_HW_FAIL, error: error };
};

export const getHealthWorkers = () => {
  return (dispatch) => {
    dispatch(getHWStarted());

    axiosInstance.get("/doctors.json").then((response) => {
      const healthWorkers = [];

      for (let key in response.data) {
        healthWorkers.push({ id: key, ...response.data[key] });
      }

      localStorage.setItem("doctors", JSON.stringify(healthWorkers));

      dispatch(getHWSuccessful(healthWorkers));
    });
  };
};
