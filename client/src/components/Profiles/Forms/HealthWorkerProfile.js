import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "../Profiles.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import updateObject from "../../../shared/utils/updateObject";
import checkValidity from "../../../shared/utils/formValidation";
import * as actionCreators from "../../../store/action-creators/createProfile";

class HealthWorkerProfile extends React.Component {
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
            { value: "-1", displayValue: "Select", disabled: true },
            { value: "male", displayValue: "Male", disabled: false },
            { value: "female", displayValue: "Female", disabled: false },
          ],
        },
        value: "-1",
        validation: { isSelected: true },
        valid: false,
      },
      cadre: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Cadre",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      department: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Department",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
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
    profileData.userType = "hw";
    localStorage.setItem("surname", profileData.surname);
    localStorage.setItem("name", profileData.name);
    this.props.onCreateHWProfile(profileData, this.props);
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
        <Button btnType="Primary" btnDisabled={!this.state.formIsValid}>
          CREATE PROFILE <i className="fas fa-address-card"></i>
        </Button>
      </form>
    );

    return (
      <React.Fragment>
        {!this.props.isAuthenticated ? <Redirect to="/login" /> : null}
        <h3 className="lead" style={{ margin: "2em 0 1em 0" }}>
          CREATE A PROFILE
        </h3>
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.profile.loading,
    isAuthenticated: state.auth.token !== null,
    path: state.profile.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateHWProfile: (profileData, props) =>
      dispatch(actionCreators.createHWProfile(profileData, props)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthWorkerProfile);
