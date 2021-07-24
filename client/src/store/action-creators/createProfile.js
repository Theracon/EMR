import axios from "axios";
import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

export const createProfileStarted = () => {
  return { type: actionTypes.CREATE_HW_PROFILE_START };
};

export const createProfileSuccessful = (userData) => {
  return { type: actionTypes.CREATE_HW_PROFILE_SUCCESS, userData: userData };
};

export const createProfileFailed = (error) => {
  return { type: actionTypes.CREATE_HW_PROFILE_FAIL, error: error };
};

export const createHWProfile = (profileData, props) => {
  return (dispatch) => {
    dispatch(createProfileStarted());
    const API_KEY = "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg";
    const token = localStorage.getItem("token");
    const data = { idToken: token };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        data
      )
      .then((response) => {
        profileData.email = response.data.users[0].email;
        profileData.userId = localStorage.getItem("userId");

        axiosInstance
          .post("/doctors.json", profileData)
          .then((response) => {
            localStorage.setItem("username", response.data.name);
            dispatch(createProfileSuccessful(response.data));
            dispatch(setRedirectPath("/hw-dashboard"));
            props.history.push("hw-dashboard");
          })
          .catch((error) => {
            dispatch(createProfileFailed(error));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createPatientProfile = (profileData, props) => {
  return (dispatch) => {
    dispatch(createProfileStarted());
    const API_KEY = "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg";
    const token = localStorage.getItem("token");
    const data = { idToken: token };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        data
      )
      .then((response) => {
        profileData.email = response.data.users[0].email;

        axiosInstance
          .post("/patients.json", profileData)
          .then((response) => {
            localStorage.setItem("username", response.data.name);
            dispatch(createProfileSuccessful(response.data));
            dispatch(setRedirectPath("/hw-dashboard"));
            props.history.push("hw-dashboard");
          })
          .catch((error) => {
            dispatch(createProfileFailed(error));
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setRedirectPath = (path) => {
  return { type: actionTypes.SET_REDIRECT_PATH, path: path };
};

export const checkPatientImageUpload = () => {
  return { type: actionTypes.CHECK_PATIENT_IMAGE_UPLOAD };
};

export const resetPatientImageUpload = () => {
  return { type: actionTypes.RESET_PATIENT_IMAGE_UPLOAD };
};
