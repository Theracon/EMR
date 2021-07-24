import * as actionTypes from "../action-types/index";

export const runMessengerStart = () => {
  return { type: actionTypes.RUN_MESSENGER_START };
};

export const runMessengerSuccessful = (doctors) => {
  return { type: actionTypes.RUN_MESSENGER_SUCCESS, doctors };
};

export const runMessengerFailed = (error) => {
  return { type: actionTypes.RUN_MESSENGER_FAIL, error };
};

export const runMessenger = () => {
  return (dispatch) => {
    dispatch(runMessengerStart());

    let doctors = [];
    doctors = JSON.parse(localStorage.getItem("doctors"));

    if (!doctors || doctors.length < 1) {
      dispatch(runMessengerFailed("Sorry, messsenger could not be started."));
    } else {
      dispatch(runMessengerSuccessful(doctors));
    }
  };
};

export const chatWithAPatient = (patientName, patientId) => {
  return {
    type: actionTypes.CHAT_WITH_A_PATIENT,
    patientName,
    patientId,
  };
};
