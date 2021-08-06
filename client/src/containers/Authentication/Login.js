import React from "react";
import { connect } from "react-redux";

import styles from "./Authentication.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import updateObject from "../../shared/utils/updateObject";
import checkValidity from "../../shared/utils/formValidation";
import * as actionCreators from "../../store/action-creators/authentication";

class Login extends React.Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: { required: true, minLength: 6 },
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

    this.props.onLogin(
      this.state.form.email.value,
      this.state.form.password.value,
      this.props
    );
  };

  redirectToHWDashboard = () => {
    this.setState({ redirectPath: "/hw-dashboard" });
  };

  redirectToPatientDashboard = () => {
    this.setState({ redirectPath: "/patient-dashboard" });
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
      <form onSubmit={this.submitFormHandler}>
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
          submit={this.submitFormHandler}
          btnDisabled={!this.state.formIsValid}
        >
          LOGIN <i className="fas fa-sign-in-alt"></i>
        </Button>
      </form>
    );

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <div>
          <p style={{ color: "darkred" }}>
            {this.props.error.message
              .replace(/-|_/, " ")
              .toLowerCase()
              .slice(0, 1)
              .toUpperCase() +
              this.props.error.message
                .replace(/-|_/, " ")
                .toLowerCase()
                .slice(1) +
              "!"}
          </p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <h3 className="text-muted" style={{ margin: "2em 0 2em 0" }}>
          Log into your account
        </h3>
        {this.props.error ? (
          <div className={styles.Auth}>{errorMessage}</div>
        ) : null}
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password, props) =>
      dispatch(actionCreators.login(email, password, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
