import React from "react";
import { Link } from "react-router-dom";

import styles from "./Patient.module.css";
import Image from "../../UserPhoto/userPhoto";
import formatName from "../../../shared/utils/formatName";

class Patient extends React.Component {
  render() {
    const patientName = this.props.name + " " + this.props.surname;

    return (
      <div className={styles.Patient}>
        <div>
          <Image imageURL={this.props.imageURL} />
        </div>
        <h5>{formatName(this.props.surname, this.props.name)}.</h5>
        <div>
          <p className={styles.Header}>Age</p>
          <p>{this.props.age}Y</p>
        </div>
        <div>
          <p className={styles.Header}>gender</p>
          <p>{this.props.gender}</p>
        </div>
        <div>
          <p className={styles.Header}>BMI</p>
          <p>{this.props.bmi}</p>
        </div>
        <div>
          <p className={styles.Header}>Height</p>
          <p>{this.props.height}cm</p>
        </div>
        <div>
          <p className={styles.Header}>Weight</p>
          <p>{this.props.weight}kg</p>
        </div>
        <div className={styles.IconsHolder}>
          <span
            className={styles.IconsHolderSpan}
            onClick={() => this.props.startChat(patientName, this.props.email)}
          >
            <Link to="/hw-dashboard">
              <i className="fas fa-comment-alt"></i>
            </Link>
          </span>
          <span
            className={styles.IconsHolderSpan}
            onClick={() => this.props.getOnePatient(this.props.email)}
          >
            <Link to="/encounter">
              <i className="fas fa-file-alt"></i>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

export default Patient;
