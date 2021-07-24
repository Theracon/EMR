import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  patientsHeading: "All Patients",
  patient: null,
  allPatients: [],
  malePatients: [],
  femalePatients: [],
  neonates: [],
  children: [],
  adults: [],
  elderly: [],
  loading: false,
  error: "",
  patientDataByGender: {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [1, 1],
      },
    ],
  },
  patientDataByAge: {
    labels: ["Neonates", "Children(1-17Y)", "Adults(18-64Y)", "Elderly(65+Y)"],
    datasets: [
      {
        label: "Age",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
        data: [1, 1, 1, 1],
      },
    ],
  },
};

const getPatientsStarted = (state) => {
  return updateObject(state, { loading: true });
};

const getPatientsSuccessful = (state, action) => {
  const malePatients = getPatientsByGender(action.patients)[0];
  const femalePatients = getPatientsByGender(action.patients)[1];
  const neonates = getPatientsByAge(action.patients)[0];
  const children = getPatientsByAge(action.patients)[1];
  const adults = getPatientsByAge(action.patients)[2];
  const elderly = getPatientsByAge(action.patients)[3];

  return updateObject(state, {
    loading: false,
    allPatients: action.patients,
    patientDataByGender: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Gender",
          backgroundColor: ["#B21F00", "#C9DE00"],
          hoverBackgroundColor: ["#501800", "#4B5000"],
          data: [+malePatients.length, +femalePatients.length],
        },
      ],
    },
    patientDataByAge: {
      labels: [
        "Neonates",
        "Children(1-17Y)",
        "Adults(18-64Y)",
        "Elderly(65+Y)",
      ],
      datasets: [
        {
          label: "Age",
          backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
          hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
          data: [
            +neonates.length,
            +children.length,
            +adults.length,
            +elderly.length,
          ],
        },
      ],
    },
  });
};

const getPatientsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const getPatientsByGender = (patients) => {
  const malePatients = patients.filter((patient) => patient.gender === "male");
  const femalePatients = patients.filter(
    (patient) => patient.gender === "female"
  );
  return [malePatients, femalePatients];
};

const getPatientsByAge = (patients) => {
  const neonates = patients.filter((patient) => Number(patient.age) < 1);
  const children = patients.filter(
    (patient) => Number(patient.age) >= 1 && Number(patient.age) <= 17
  );
  const adults = patients.filter(
    (patient) => Number(patient.age) >= 18 && Number(patient.age) <= 64
  );
  const elderly = patients.filter((patient) => Number(patient.age) >= 65);
  return [neonates, children, adults, elderly];
};

const showPatientsByGender = (state, action) => {
  return updateObject(state, { allPatients: action.patients, loading: false });
};

const showPatientsByAge = (state, action) => {
  return updateObject(state, { allPatients: action.patients, loading: false });
};

const showPatientsByBMI = (state, action) => {
  return updateObject(state, { allPatients: action.patients, loading: false });
};

const showPatientsByName = (state, action) => {
  return updateObject(state, { allPatients: action.patients, loading: false });
};

const getPatient = (state, action) => {
  return updateObject(state, { patient: action.patient, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS_START:
      return getPatientsStarted(state);
    case actionTypes.GET_PATIENTS_SUCCESS:
      return getPatientsSuccessful(state, action);
    case actionTypes.GET_PATIENTS_FAIL:
      return getPatientsFailed(state, action);
    case actionTypes.GET_PATIENTS_BY_GENDER:
      return showPatientsByGender(state, action);
    case actionTypes.GET_PATIENTS_BY_AGE:
      return showPatientsByAge(state, action);
    case actionTypes.GET_PATIENTS_BY_BMI:
      return showPatientsByBMI(state, action);
    case actionTypes.GET_PATIENTS_BY_NAME:
      return showPatientsByName(state, action);
    case actionTypes.GET_PATIENT:
      return getPatient(state, action);
    default:
      return state;
  }
};

export default reducer;
