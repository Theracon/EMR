import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

export const getPatientsStarted = () => {
  return { type: actionTypes.GET_PATIENTS_START };
};

export const getPatientsSuccessful = (patients) => {
  return { type: actionTypes.GET_PATIENTS_SUCCESS, patients: patients };
};

export const getPatientsFailed = (error) => {
  return { type: actionTypes.GET_PATIENTS_FAIL, error: error };
};

export const getPatients = () => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    axiosInstance
      .get("/patients.json")
      .then((response) => {
        const allPatients = [];

        for (let key in response.data) {
          allPatients.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }

        if (allPatients.length > 0) {
          localStorage.setItem("patients", JSON.stringify(allPatients));
        } else {
          localStorage.setItem("patients", JSON.stringify([]));
        }

        dispatch(getPatientsSuccessful(allPatients));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByGender = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_GENDER, patients: patients };
};

export const getPatientsByGender = (gender) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    const queryParams = `?orderBy="gender"&equalTo="${gender}"`;

    axiosInstance
      .get(`/patients.json${queryParams}`)
      .then((response) => {
        const patientsByGender = [];

        for (let key in response.data) {
          patientsByGender.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }
        dispatch(syncGetPatientsByGender(patientsByGender));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByAge = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_AGE, patients: patients };
};

export const getPatientsByAge = (ageFrom, ageTo) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    axiosInstance
      .get("/patients.json")
      .then((response) => {
        const allPatients = [];

        for (let key in response.data) {
          allPatients.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }

        const patientsByAge = allPatients.filter(
          (patient) => +patient.age >= +ageFrom && +patient.age <= +ageTo
        );
        dispatch(syncGetPatientsByAge(patientsByAge));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByBMI = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_BMI, patients: patients };
};

export const getPatientsByBMI = (bmiFrom, bmiTo) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    axiosInstance
      .get("/patients.json")
      .then((response) => {
        const allPatients = [];

        for (let key in response.data) {
          allPatients.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }

        const patientsByBMI = allPatients.filter(
          (patient) => +patient.bmi >= +bmiFrom && +patient.bmi <= +bmiTo
        );
        dispatch(syncGetPatientsByBMI(patientsByBMI));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByName = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_NAME, patients: patients };
};

export const getPatientsByName = (string) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    axiosInstance
      .get("/patients.json")
      .then((response) => {
        const allPatients = [];

        for (let key in response.data) {
          allPatients.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }

        const patientsByName = allPatients.filter((patient) => {
          const patientName = [
            ...patient.surname.toLowerCase().split(" "),
            ...patient.name.toLowerCase().split(" "),
          ].join(" ");

          const patientName_2 = [
            ...patient.name.toLowerCase().split(" "),
            ...patient.surname.toLowerCase().split(" "),
          ].join(" ");

          const patientName_3 = [
            ...patient.surname.toLowerCase().split(" "),
            ...patient.name.toLowerCase().split(" "),
          ].join("");

          const patientName_4 = [
            ...patient.name.toLowerCase().split(" "),
            ...patient.surname.toLowerCase().split(" "),
          ].join("");

          return (
            patientName.includes(string.toLowerCase()) ||
            patientName_2.includes(string.toLowerCase()) ||
            patientName_3.includes(string.toLowerCase()) ||
            patientName_4.includes(string.toLowerCase())
          );
        });

        dispatch(syncGetPatientsByName(patientsByName));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatient = (patient) => {
  return { type: actionTypes.GET_PATIENT, patient: patient };
};

export const getPatient = (email) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());
    const allPatients = JSON.parse(localStorage.getItem("patients"));
    const patient = allPatients.find((element) => element.email === email);
    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
      dispatch(syncGetPatient(patient));
    } else {
      dispatch(getPatientsFailed("Patient not found."));
    }
  };
};
