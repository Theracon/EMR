import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Encounters.module.css";
import * as authActionCreators from "../../store/action-creators/authentication";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";

class Encounters extends React.Component {
  state = {
    encounters: [],
    emptyText: "",
    classes: styles.Active,
  };

  componentDidMount() {
    document.getElementById("created").classList.add(styles.Active);
    this.createdEncountersHandler("created");
  }

  setActiveClass(id) {
    const nodesList = document.querySelectorAll(`.${styles.ToggleButton}`);
    for (let i = 0; i < nodesList.length; i++) {
      nodesList[i].classList.remove(styles.Active);
    }
    document.getElementById(id).classList.add(styles.Active);
  }

  createdEncountersHandler = (id) => {
    this.setActiveClass(id);

    const email = localStorage.getItem("email");
    const allEncounters = JSON.parse(localStorage.getItem("encounters"));
    const createdEncounters = allEncounters.filter(
      (createdEncounter) => createdEncounter.savedBy === email
    );

    this.setState({ encounters: createdEncounters });
  };

  receivedEncountersHandler = (id) => {
    this.setActiveClass(id);

    const email = localStorage.getItem("email");
    const allEncounters = JSON.parse(localStorage.getItem("encounters"));
    const receivedEncounters = allEncounters.filter(
      (receivedEncounter) =>
        receivedEncounter.tier === "tier_2" &&
        receivedEncounter.receivers.indexOf(email) !== -1
    );

    this.setState({ encounters: receivedEncounters });
  };

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;

    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
      this.props.onLogout();
    }

    let encounters = (
      <React.Fragment>
        <Backdrop />
        <Spinner />
      </React.Fragment>
    );
    if (!this.props.loading) {
      encounters = (
        <div className={`${styles.Encounters} overflow-auto`}>
          {this.state.encounters.map((encounter) => {
            return (
              <div key={encounter.id} className={styles.Encounter}>
                <div className={styles.TextBox}>
                  <h3 className="lead">DATE</h3>
                  <p>{encounter.date}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">NAME</h3>
                  <p>{encounter.patientName}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">AGE</h3>
                  <p>{encounter.patientAge}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">GENDER</h3>
                  <p>{encounter.patientGender}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">WEIGHT</h3>
                  <p>{encounter.patientWeight}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">HEIGHT</h3>
                  <p>{encounter.patientHeight}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">BMI</h3>
                  <p>{encounter.patientBMI}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">VISIT STATUS</h3>
                  <p>{encounter.visit}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">BLOOD PRESSURE</h3>
                  <p>
                    {encounter.bloodPressureSystolic}/
                    {encounter.bloodPressureDiastolic} mmHg
                  </p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">TEMPERATURE (CELSIUS)</h3>
                  <p>{encounter.temperatureInCelsius}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">COMPLAINTS</h3>
                  <p>{encounter.complaints}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">DIAGNOSIS</h3>
                  <p>{encounter.diagnosis}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">TREATMENT PLAN</h3>
                  <p>{encounter.treatmentPlan}</p>
                </div>

                <div className={styles.TextBox}>
                  <h3 className="lead">BY</h3>
                  <p>{encounter.savedBy}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <React.Fragment>
        {redirectToLogin}
        <div className={styles.Container}>
          <div className={styles.ToggleButtonHolder}>
            <div
              id="created"
              className={styles.ToggleButton}
              onClick={() => this.createdEncountersHandler("created")}
            >
              CREATED
            </div>
            <div
              id="received"
              className={styles.ToggleButton}
              onClick={() => this.receivedEncountersHandler("received")}
            >
              RECEIVED
            </div>
          </div>
          {this.state.encounters.length < 1 ? (
            <div
              style={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p className="lead text-center">NO DATA TO DISPLAY.</p>
            </div>
          ) : null}
          {encounters}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.encounters.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Encounters);
