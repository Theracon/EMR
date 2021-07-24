import React from "react";
import { connect } from "react-redux";
import { Pie, Doughnut } from "react-chartjs-2";

import * as patientsActionCreators from "../../../store/action-creators/patients";
import styles from "./Charts.module.css";

class Charts extends React.Component {
  componentDidMount() {
    this.props.onGetPatients();
  }

  patientDataByGender = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [+this.props.numMalePatients, +this.props.numFemalePatients],
      },
    ],
  };

  patientDataByAge = {
    labels: ["Neonates", "Children(1-17Y)", "Adults(18-64Y)", "Elderly(65+Y)"],
    datasets: [
      {
        label: "Age",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
        data: [
          this.props.numNeonates,
          this.props.numChildren,
          this.props.numAdults,
          this.props.numElderly,
        ],
      },
    ],
  };

  render() {
    // Conditionally display pie chart
    let pieChart = null;
    if (this.props.loading) {
      pieChart = <p className="lead text-center">CHART LOADING...</p>;
    } else {
      pieChart = (
        <Pie
          data={this.props.patientDataByGender}
          options={{
            title: {
              display: true,
              text: "Patients disaggregated by gender",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      );
    }

    // Conditionally display doughnut chart
    let doughnutChart = null;
    if (this.props.loading) {
      doughnutChart = <p className="lead text-center">CHART LOADING...</p>;
    } else {
      doughnutChart = (
        <Doughnut
          data={this.props.patientDataByAge}
          options={{
            title: {
              display: true,
              text: "Patients disaggregated by age",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      );
    }

    return (
      <div className={styles.Charts}>
        <h3 className="display-6 lead">Patients By Gender: All</h3>
        {pieChart}

        <div style={{ margin: "70px 0" }}></div>

        <h3 className="lead display-6">Patients By Age: All</h3>
        {doughnutChart}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.patients.loading,
    patientDataByGender: state.patients.patientDataByGender,
    patientDataByAge: state.patients.patientDataByAge,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPatients: () => dispatch(patientsActionCreators.getPatients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
