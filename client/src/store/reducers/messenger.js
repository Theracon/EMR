import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  doctorName: null,
  doctorId: null,
  patientName: null,
  patientId: null,
  loading: false,
  error: null,
};

const runMessengerStart = (state) => {
  return updateObject(state, { loading: true });
};

const runMessengerSuccessful = (state, action) => {
  const doctors = action.doctors;

  const index = Math.round(Math.random() * (doctors.length - 1));
  const doctor = doctors[index];
  const doctorName = `${doctor.name} ${doctor.surname}`;
  const doctorId = doctor.email;

  localStorage.setItem("doctorName", `Dr. ${doctorName}`);
  localStorage.setItem("doctorId", doctorId);

  return updateObject(state, { loading: false, doctorName, doctorId });
};

const runMessengerFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const chatWithAPatient = (state, action) => {
  localStorage.setItem("patientName", action.patientName);
  localStorage.setItem("patientId", action.patientId);

  return updateObject(state, {
    loading: false,
    patientName: action.patientName,
    patientId: action.patientId,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RUN_MESSENGER_START:
      return runMessengerStart(state);
    case actionTypes.RUN_MESSENGER_SUCCESS:
      return runMessengerSuccessful(state, action);
    case actionTypes.RUN_MESSENGER_FAIL:
      return runMessengerFailed(state, action);
    case actionTypes.CHAT_WITH_A_PATIENT:
      return chatWithAPatient(state, action);
    default:
      return state;
  }
};

export default reducer;
