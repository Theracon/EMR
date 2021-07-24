import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./PatientDashboard.module.css";
import * as authActionCreators from "../../../store/action-creators/authentication";
import * as userModeActionCreators from "../../../store/action-creators/userModes";
import * as patientsActionCreators from "../../../store/action-creators/patients";
import * as messengerActionCreators from "../../../store/action-creators/messenger";
import Image from "../../../components/UserPhoto/userPhoto";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Spinner from "../../../components/UI/Spinner/Spinner";

class PatientDashboard extends React.Component {
  componentDidMount() {
    this.props.onSwitchToPatientUserMode();
    this.props.onGetPatient(localStorage.getItem("email"));
  }

  loadMessenger = () => {
    this.props.onRunMessenger();
    this.props.history.push("messenger");
  };

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;
    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
      this.props.onLogout();
    }

    let patientProfileUI = (
      <React.Fragment>
        <Backdrop />
        <Spinner />
      </React.Fragment>
    );
    if (this.props.patient) {
      const patient = this.props.patient;

      patientProfileUI = (
        <div className={styles.ProfileData}>
          <div>
            <Image imageURL={patient.image} class={styles.Photo} />
          </div>
          <div className={styles.ProfileDataText}>
            <div>
              <h3 className="lead">NAME</h3>
              <p>{`${patient.name} ${patient.surname}`}</p>
            </div>

            <div>
              <h3 className="lead">AGE</h3>
              <p>{patient.age}Y</p>
            </div>

            <div>
              <h3 className="lead">GENDER</h3>
              <p>
                {patient.gender.slice(0, 1).toUpperCase() +
                  patient.gender.slice(1)}
              </p>
            </div>

            <div>
              <h3 className="lead">WEIGHT</h3>
              <p>{patient.weight}kg</p>
            </div>

            <div>
              <h3 className="lead">HEIGHT</h3>
              <p>{patient.height}cm</p>
            </div>

            <div>
              <h3 className="lead">BMI</h3>
              <p>{patient.bmi.toFixed(2)}</p>
            </div>

            <div>
              <h3 className="lead">EMAIL</h3>
              <p>{patient.email}</p>
            </div>

            <div>
              <h3 className="lead">WARD</h3>
              <p>{patient.ward}</p>
            </div>

            <div>
              <h3 className="lead">LGA</h3>
              <p>{patient.lga}</p>
            </div>

            <div>
              <h3 className="lead">STATE</h3>
              <p>{patient.state}</p>
            </div>
          </div>
        </div>
      );
    }

    const name =
      localStorage.getItem("name") + " " + localStorage.getItem("surname");

    return (
      <React.Fragment>
        {redirectToLogin}
        <div className={styles.DisplayDiv}>
          <p className={styles.DisplayName}>
            Hello, <span>{name}.</span>
          </p>
        </div>
        <div className={styles.PatientDashboard}>
          <span className={styles.ChatButton} onClick={this.loadMessenger}>
            <i className="fas fa-comment-alt"></i>
          </span>
          {patientProfileUI}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.patients.patient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToPatientUserMode: () =>
      dispatch(userModeActionCreators.switchToPatientUserMode()),

    onGetPatient: (email) => dispatch(patientsActionCreators.getPatient(email)),

    onRunMessenger: () => dispatch(messengerActionCreators.runMessenger()),

    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDashboard);
