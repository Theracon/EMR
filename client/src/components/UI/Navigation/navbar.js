import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import styles from "./navbar.module.css";
import * as authctionCreators from "../../../store/action-creators/authentication";
import * as userModesActionCreators from "../../../store/action-creators/userModes";

class Navbar extends React.Component {
  switchUserType = () => {
    this.props.onSwitchToPatientUserType();
    this.props.onChangeToPatientUserMode();
  };

  switchToHWUserType = () => {
    this.props.onSwitchToHWUserType();
  };

  goToHomePage = (history) => {
    history.push("/");
  };

  render() {
    const userType = localStorage.getItem("userType");

    if (!this.props.isAuthenticated) {
      return (
        <nav
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: "#2F5D62",
            minHeight: "10vh",
            color: "white",
          }}
        >
          <div className="container-fluid">
            <div
              className={styles.HeaderDiv}
              onClick={() => this.goToHomePage(this.props.history)}
            >
              <h1 className={styles.HeaderText}>EMR</h1>
              <i
                className={"fas fa-stethoscope " + styles.Logo}
                style={{ color: "#DFEEEA" }}
              ></i>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ color: "#DFEEEA" }}
              >
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={styles.List}>
                <li>
                  <NavLink
                    to="/login"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>LOGIN</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>SIGNUP</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else if (this.props.isAuthenticated && userType === "hw") {
      return (
        <nav
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: "#2F5D62",
            minHeight: "10vh",
            color: "white",
          }}
        >
          <div className="container-fluid">
            <div
              className={styles.HeaderDiv}
              onClick={() => this.goToHomePage(this.props.history)}
            >
              <h1 className={styles.HeaderText}>EMR</h1>
              <i
                className={"fas fa-user-md " + styles.Logo}
                style={{ color: "#DFEEEA" }}
              ></i>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ color: "#DFEEEA" }}
              >
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={styles.List}>
                <li onClick={this.switchToHWUserType}>
                  <NavLink
                    to="/hw-dashboard"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>DASHBOARD</span>
                  </NavLink>
                </li>

                <li onClick={this.switchUserType}>
                  <NavLink
                    to="/signup"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>REGISTER A PATIENT</span>
                  </NavLink>
                </li>

                <li onClick={this.switchUserType}>
                  <NavLink
                    to="/my-encounters"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>ENCOUNTERS</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/logout"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>LOGOUT</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else if (this.props.isAuthenticated && userType === "patient") {
      return (
        <nav
          className="navbar navbar-expand-lg"
          style={{
            backgroundColor: "#2F5D62",
            minHeight: "10vh",
            color: "white",
          }}
        >
          <div className="container-fluid">
            <div
              className={styles.HeaderDiv}
              onClick={() => this.goToHomePage(this.props.history)}
            >
              <h1 className={styles.HeaderText}>EMR</h1>
              <i
                className={"fas fa-procedures " + styles.Logo}
                style={{ color: "#DFEEEA" }}
              ></i>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span
                className="navbar-toggler-icon"
                style={{ color: "#DFEEEA" }}
              >
                <i className="fas fa-bars"></i>
              </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={styles.List}>
                <li>
                  <NavLink
                    to="/patient-dashboard"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>DASHBOARD</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/logout"
                    exact
                    activeClassName={styles.Active}
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#DFEEEA" }}>LOGOUT</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <p className="lead text-center">
          Navbar not displaying due to an internal error.
        </p>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    currentUserMode: state.userMode.userMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToPatientUserType: () =>
      dispatch(authctionCreators.switchUserTypeToPatient()),

    onSwitchToHWUserType: () =>
      dispatch(authctionCreators.switchUserTypeToHW()),

    onChangeToPatientUserMode: () =>
      dispatch(userModesActionCreators.switchToPatientUserMode()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
