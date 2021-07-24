import React from "react";

import styles from "./Patients.module.css";
import Patient from "./patient/Patient";
import Spinner from "../UI/Spinner/Spinner";

const patients = (props) => {
  let patients = [];

  if (props.patients) {
    patients = props.patients.map((patient) => {
      return (
        <Patient
          key={patient.id}
          name={patient.name}
          surname={patient.surname}
          age={patient.age}
          gender={patient.gender}
          email={patient.email}
          bmi={patient.bmi.toFixed(2)}
          height={patient.height}
          weight={patient.weight}
          imageURL={patient.image}
          getOnePatient={(email) => props.getOnePatient(email)}
          startChat={(patientName, patientId) =>
            props.startChat(patientName, patientId)
          }
          history={props.history}
        />
      );
    });
  }
  if (!props.patients) {
    return (
      <div className={styles.Patients}>
        <h3 className="display-6 lead" style={{ marginTop: "2rem" }}>
          Patients
        </h3>
        <Spinner style={{ position: "absolute" }} />
      </div>
    );
  } else {
    if (props.patients.length > 0) {
      return (
        <div className={styles.Patients}>
          <h3 className="display-6 lead" style={{ margin: "1em auto" }}>
            Patients
          </h3>
          {patients}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div style={{ margin: "30vh auto" }}>
            <p className="lead" style={{ margin: 0 }}>
              NO PATIENTS TO DISPLAY.
            </p>
            <small>Try refining the filters.</small>
          </div>
        </React.Fragment>
      );
    }
  }
};

export default patients;
