import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "../Profiles.module.css";
import * as actionCreators from "../../../store/action-creators/createProfile";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import updateObject from "../../../shared/utils/updateObject";
import checkValidity from "../../../shared/utils/formValidation";
import UploadImage from "../UploadImage/UploadImage";

class PatientProfile extends React.Component {
  state = {
    form: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      surname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Surname",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      age: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Age",
        },
        value: "",
        validation: { required: true, isNumber: true },
        valid: false,
        touched: false,
      },
      gender: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "-1", displayValue: "Gender", disabled: true },
            { value: "male", displayValue: "Male", disabled: false },
            { value: "female", displayValue: "Female", disabled: false },
          ],
        },
        value: "-1",
        validation: {},
        valid: false,
      },
      height: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Height in cm",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      weight: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Weight in kg",
          step: "0.1",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      state: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "-1", displayValue: "State", disabled: true },
            { value: "Lagos", displayValue: "Lagos", disabled: false },
          ],
        },
        value: "-1",
        validation: {},
        valid: false,
      },
      lga: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "-1", displayValue: "LGA", disabled: true },
            { value: "Ikeja", displayValue: "Ikeja", disabled: false },
          ],
        },
        value: "-1",
        validation: {},
        valid: false,
      },
      ward: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "-1",
              displayValue: "Ward",
              disabled: true,
            },
            {
              value: "Adekunle Vill./adeniyi Jones/ogba",
              displayValue: "Adekunle Vill./adeniyi Jones/ogba",
              disabled: false,
            },
          ],
        },
        value: "-1",
        validation: {},
        valid: false,
      },
    },
    formIsValid: false,
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

  submitFormHandler = (event) => {
    event.preventDefault();

    let profileData = {};
    for (let prop in this.state.form) {
      profileData[prop] = this.state.form[prop].value;
    }
    profileData.image = localStorage.getItem("patientImage");
    profileData.userType = "patient";
    profileData.bmi =
      this.state.form["weight"] / Math.pow(this.state.form["height"], 2);
    this.props.onCreatePatientProfile(profileData, this.props);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form className={styles.Profile} onSubmit={this.submitFormHandler}>
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
        <UploadImage />
        <Button
          btnType="Primary"
          btnDisabled={
            !this.state.formIsValid && !this.props.isPatientImageUploaded
          }
        >
          CREATE PROFILE <i className="fas fa-address-card"></i>
        </Button>
      </form>
    );

    return (
      <React.Fragment>
        {!this.props.isAuthenticated ? <Redirect to="/login" /> : null}
        <h3 className="lead" style={{ margin: "2em 0 1em 0" }}>
          CREATE PATIENT PROFILE
        </h3>
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.profile.loading,
    path: state.profile.path,
    isAuthenticated: state.auth.token !== null,
    isPatientImageUploaded: state.profile.isPatientImageUploaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreatePatientProfile: (profileData, props) =>
      dispatch(actionCreators.createPatientProfile(profileData, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
