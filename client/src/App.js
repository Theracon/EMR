import React from "react";
import styles from "./App.module.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as authActionCreators from "./store/action-creators/authentication";
import * as healthWorkersActionCreators from "./store/action-creators/healthWorkers";
import * as patientsActionCreators from "./store/action-creators/patients";
import * as encountersActionCreators from "./store/action-creators/encounters";

import Signup from "./containers/Authentication/Signup";
import Login from "./containers/Authentication/Login";
import Logout from "./containers/Authentication/Logout";
import HWDashboard from "./containers/Dashboards/HealthWorkerDashboard/HealthWorkerDashboard";
import PatientDashboard from "./containers/Dashboards/PatientDashboard/PatientDashboard";
import Encounter from "./containers/Encounter/Encounter";
import Encounters from "./containers/Encounters/Encounters";
import Messenger from "./containers/Messenger/Messenger";
import VideoChat from "./containers/VideoChat/VideoChat";

import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/UI/Navigation/navbar";
import HealthWorkerProfile from "./components/Profiles/Forms/HealthWorkerProfile";
import PatientProfile from "./components/Profiles/Forms/PatientProfile";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Spinner from "./components/UI/Spinner/Spinner";

export class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    this.props.onAutoLogin(token, userId);
    this.props.onGetAllDoctors();
    this.props.onGetAllPatients();
    this.props.onFetchEncounters();
  }

  render() {
    let loadingUI = null;
    if (this.props.authLoading || this.props.profileLoading) {
      loadingUI = (
        <React.Fragment>
          <Backdrop />
          <Spinner />
        </React.Fragment>
      );
    }

    let routes = (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/hw-create-profile" component={HealthWorkerProfile} />
        <Route path="/patient-create-profile" component={PatientProfile} />
        <Route path="/hw-dashboard" component={HWDashboard} />
        <Route path="/patient-dashboard" component={PatientDashboard} />
        <Route path="/encounter" component={Encounter} />
        <Route path="/my-encounters" component={Encounters} />
        <Route path="/messenger" component={Messenger} />
        <Route path="/video-chat" component={VideoChat} />
        <Route path="/" exact component={Homepage} />
        <Redirect to="/login" />
      </Switch>
    );

    return (
      <>
        <div className={styles.App}>
          <Navbar />
          {loadingUI}
          {routes}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authLoading: state.auth.loading,
    profileLoading: state.profile.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: (token, userId) =>
      dispatch(authActionCreators.authenticationSuccessful(token, userId)),

    onGetAllDoctors: () =>
      dispatch(healthWorkersActionCreators.getHealthWorkers()),

    onGetAllPatients: () => dispatch(patientsActionCreators.getPatients()),

    onFetchEncounters: (email) =>
      dispatch(encountersActionCreators.fetchEncounters(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
