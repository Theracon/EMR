import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Encounter.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import checkValidity from "../../shared/utils/formValidation";
import updateObject from "../../shared/utils/updateObject";
import * as authActionCreators from "../../store/action-creators/authentication";
import * as hWActionCreators from "../../store/action-creators/healthWorkers";
import * as patientsActionCreators from "../../store/action-creators/patients";
import * as encounterActionCreators from "../../store/action-creators/encounter";
import * as encountersActionCreators from "../../store/action-creators/encounters";
import MultiSelect from "../../components/UI/MultiSelect/MultiSelect";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";

class Encounter extends React.Component {
  state = {
    form: {
      visit: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "-1", displayValue: "Select visit", disabled: true },
            { value: "First time visit", displayValue: "First time visit" },
            { value: "Repeat visit", displayValue: "Repeat visit" },
          ],
        },
        value: "",
        validation: { isSelected: true },
        valid: false,
      },

      bloodPressureSystolic: {
        elementType: "input",
        elementConfig: {
          type: "number",
          step: "0.1",
          placeholder: "Blood pressure (systolic)",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      bloodPressureDiastolic: {
        elementType: "input",
        elementConfig: {
          type: "number",
          step: "0.1",
          placeholder: "Blood pressure (diastolic)",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      temperatureInCelsius: {
        elementType: "input",
        elementConfig: {
          type: "number",
          step: "0.1",
          placeholder: "Temperature (in Celsius)",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      respiratoryRate: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Respiratory rate",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      complaints: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Complaints",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      diagnosis: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "-1", displayValue: "Select diagnosis" },
            { value: "Hypertension", displayValue: "Hypertension" },
            { value: "Pnemonia", displayValue: "Pnemonia" },
            { value: "Malaria", displayValue: "Malaria" },
            { value: "Diabetes", displayValue: "Diabetes" },
          ],
        },
        value: "",
        validation: {},
        valid: false,
      },

      treatmentPlan: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Treatment plan",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    showSendTo: false,
    encounterSaved: false,
    patient: {},
  };

  inputChangedHandler = (event, elementId) => {
    const updatedFormElement = updateObject(this.state.form[elementId], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.form[elementId].validation
      ),
      touched: true,
    });

    const updatedForm = updateObject(this.state.form, {
      [elementId]: updatedFormElement,
    });

    let formIsValid = true;
    for (let elementId in updatedForm) {
      formIsValid = updatedForm[elementId].valid && formIsValid;
    }

    this.setState({
      form: updatedForm,
      formIsValid: formIsValid,
    });
  };

  saveEncounterHandler = (event) => {
    event.preventDefault();

    const encounter = {};

    for (let prop in this.state.form) {
      encounter[prop] = this.state.form[prop].value;
    }

    encounter.date = new Date().toLocaleString("en-NG");
    encounter.patientName =
      this.state.patient.name + " " + this.state.patient.surname;
    encounter.patientAge = this.state.patient.age + " years";
    encounter.patientGender = this.state.patient.gender;
    encounter.patientWeight = this.state.patient.weight + "kg";
    encounter.patientHeight = this.state.patient.height + "cm";
    encounter.patientBMI = this.state.patient.bmi.toFixed(2);
    encounter.savedBy = localStorage.getItem("email");

    this.props.onSaveEncounter(encounter);
    this.props.onFetchEncounters();
    this.props.history.push("/hw-dashboard");
  };

  sendEncounterHandler = () => {
    this.setState({ encounterSaved: true });

    const encounter = {};

    for (let prop in this.state.form) {
      encounter[prop] = this.state.form[prop].value;
    }

    encounter.date = new Date().toLocaleString("en-NG");
    encounter.patientName =
      this.state.patient.name + " " + this.state.patient.surname;
    encounter.patientAge = this.state.patient.age + " years";
    encounter.patientGender = this.state.patient.gender;
    encounter.patientWeight = this.state.patient.weight + "kg";
    encounter.patientHeight = this.state.patient.height + "cm";
    encounter.patientBMI = this.state.patient.bmi.toFixed(2);
    encounter.savedBy = localStorage.getItem("email");

    const receivers = this.props.receivers.map((receiver) => {
      return receiver.value;
    });

    this.props.onSetEncounterSentStatus();
    this.props.onSendEncounter(encounter, receivers);
    this.props.onFetchEncounters();
    this.props.history.push("/hw-dashboard");
  };

  showSendTohandler = () => {
    this.setState({ showSendTo: true });
  };

  UNSAFE_componentWillMount() {
    this.props.onGetHealthWorkers();

    const patient = JSON.parse(localStorage.getItem("patient"));
    this.setState({ patient });
  }

  render() {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    let redirectToLogin = null;

    if (new Date() >= expirationDate) {
      redirectToLogin = <Redirect to="/login" />;
      this.props.onLogout();
    }

    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form className={styles.Form} onSubmit={this.saveEncounterHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            isValid={formElement.config.valid}
            touched={formElement.config.touched}
          />
        ))}
        <Button
          btnType="Primary"
          btnDisabled={!this.state.formIsValid || this.props.encounter}
        >
          SAVE ONLY <i className="fas fa-save"></i>
        </Button>
      </form>
    );

    let healthWorkerDropdownOptions = [];
    if (this.props.healthWorkers) {
      healthWorkerDropdownOptions = this.props.healthWorkers.map(
        (healthWorker) => {
          return {
            value: healthWorker.email,
            label: `${healthWorker.name} ${healthWorker.surname}`,
          };
        }
      );

      healthWorkerDropdownOptions = healthWorkerDropdownOptions.filter(
        (el) => el.value != localStorage.getItem("email")
      );
    }

    let sendToDetails = null;
    if (this.state.showSendTo) {
      sendToDetails = (
        <div className={styles.Input}>
          <MultiSelect options={healthWorkerDropdownOptions} />
          <Button
            btnType="Primary"
            btnDisabled={this.state.encounterSaved}
            click={this.sendEncounterHandler}
          >
            CONFIRM <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      );
    }

    let encounterSavedSuccessMessage = null;

    if (this.props.encounter) {
      encounterSavedSuccessMessage = (
        <p className="text-success lead">Saved!</p>
      );
    }

    if (this.props.encounterSent) {
      encounterSavedSuccessMessage = (
        <p className="text-success lead">Saved and sent to recipients!</p>
      );
    }

    let profile = <Spinner />;
    if (!this.props.loading || !this.props.patient) {
      profile = (
        <div className={styles.Profile}>
          <div>
            <h3 className="lead">NAME</h3>
            <p>{this.state.patient.name + " " + this.state.patient.surname}</p>
          </div>

          <div>
            <h3 className="lead">WEIGHT</h3>
            <p>{this.state.patient.weight}kg</p>
          </div>

          <div>
            <h3 className="lead">HEIGHT</h3>
            <p>{this.state.patient.height}cm</p>
          </div>

          <div>
            <h3 className="lead">BMI</h3>
            <p>{this.state.patient.bmi.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="lead">DATE</h3>
            <p>{new Date().toLocaleDateString("en-NG")}</p>
          </div>

          <div>
            <h3 className="lead">TIME</h3>
            <p>{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {redirectToLogin}
        {this.props.encLoading ? (
          <React.Fragment>
            <Backdrop />
            <Spinner />
          </React.Fragment>
        ) : null}

        <div className={styles.Container}>
          <h3 className="lead" style={{ margin: "2em 0 1em 0" }}>
            CREATE AN ENCOUNTER REPORT
          </h3>
          {profile}
          {form}

          <div>{encounterSavedSuccessMessage}</div>

          <Button
            btnType="Secondary"
            btnDisabled={
              !this.state.formIsValid && !this.props.isPatientImageUploaded
            }
            click={this.showSendTohandler}
          >
            SAVE AND SEND <i className="fas fa-chevron-circle-down"></i>
          </Button>

          {sendToDetails}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    healthWorkers: state.healthWorkers.healthWorkers,
    patient: state.patients.patient,
    loading: state.patients.loading,
    encounter: state.encounter.encounter,
    receivers: state.encounter.receivers,
    encounterSent: state.encounter.encounterSent,
    encLoading: state.encounter.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHealthWorkers: () => dispatch(hWActionCreators.getHealthWorkers()),

    onGetOnePatient: (email) =>
      dispatch(patientsActionCreators.getPatient(email)),

    onSaveEncounter: (encounter) =>
      dispatch(encounterActionCreators.saveEncounter(encounter)),

    onSendEncounter: (encounter, receivers) =>
      dispatch(encounterActionCreators.sendEncounter(encounter, receivers)),

    onSetEncounterSentStatus: () =>
      dispatch(encounterActionCreators.setEncounterSentStatus()),

    onFetchEncounters: () =>
      dispatch(encountersActionCreators.fetchEncounters()),

    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
