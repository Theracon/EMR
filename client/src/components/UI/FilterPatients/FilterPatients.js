import React from "react";
import styles from "./FilterPatients.module.css";

class FilterPatients extends React.Component {
  state = {
    gender: "male",
    ageFrom: "",
    ageTo: "",
    bmiFrom: "",
    bmiTo: "",
  };

  inputChangedHandler = (e, inputId) => {
    switch (inputId) {
      case "gender":
        this.setState({ gender: e.target.value });
        break;
      case "ageFrom":
        this.setState({ ageFrom: e.target.value });
        break;
      case "ageTo":
        this.setState({ ageTo: e.target.value });
        break;
      case "bmiFrom":
        this.setState({ bmiFrom: e.target.value });
        break;
      case "bmiTo":
        this.setState({ bmiTo: e.target.value });
        break;
      default:
        return null;
    }
  };

  render() {
    let filterDisplay = null;

    if (this.props.showControls) {
      filterDisplay = (
        <React.Fragment>
          <div>
            <button onClick={this.props.getAllPatients}>All patients</button>
          </div>
          <div>
            <select
              id="gender"
              value={this.state.gender}
              onChange={(e) => this.inputChangedHandler(e, "gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button
              onClick={() => this.props.getPatientsByGender(this.state.gender)}
            >
              Filter by gender
            </button>
          </div>
          <div>
            <input
              type="number"
              placeholder="From"
              id="ageFrom"
              value={this.state.ageFrom}
              onChange={(e) => this.inputChangedHandler(e, "ageFrom")}
            />
            <input
              type="number"
              placeholder="To"
              id="ageTo"
              value={this.state.ageTo}
              onChange={(e) => this.inputChangedHandler(e, "ageTo")}
            />
            <button
              onClick={() =>
                this.props.getPatientsByAge(
                  this.state.ageFrom,
                  this.state.ageTo
                )
              }
            >
              Filter by age
            </button>
          </div>
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="From"
              id="bmiFrom"
              value={this.state.bmiFrom}
              onChange={(e) => this.inputChangedHandler(e, "bmiFrom")}
            />
            <input
              type="number"
              step="0.01"
              placeholder="To"
              id="bmiTo"
              value={this.state.bmiTo}
              onChange={(e) => this.inputChangedHandler(e, "bmiTo")}
            />
            <button
              onClick={() =>
                this.props.getPatientsByBMI(
                  this.state.bmiFrom,
                  this.state.bmiTo
                )
              }
            >
              Filter by BMI
            </button>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className={styles.Container}>
        <div>
          <i className="fas fa-filter" onClick={this.props.toggleControls}></i>
        </div>
        {filterDisplay}
      </div>
    );
  }
}

export default FilterPatients;
