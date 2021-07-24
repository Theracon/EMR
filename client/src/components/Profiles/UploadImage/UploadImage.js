import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/action-creators/createProfile";
import firebase from "../../../firebase";
import styles from "./UploadImage.module.css";
import Input from "../../UI/Input/Input";

export class UploadImage extends React.Component {
  state = {
    files: null,
    imageUploaded: false,
  };

  componentDidMount() {
    this.props.onResetPatientImage();
  }

  componentDidUpdate() {
    this.showImage();
  }

  inputChangedHandler = (files) => {
    this.setState({ files: files });
  };

  uploadImageHandler = () => {
    let bucketName = "images";
    let file = this.state.files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      //let downloadURL = uploadTask.snapshot.downloadURL;
    });
    this.setState({ imageUploaded: true });
    this.props.onUploadPatientImage();
  };

  showImage = () => {
    let storageRef = firebase.storage().ref();
    //let spaceRef = storageRef.child("images/" + this.state.files[0].name);
    storageRef
      .child("images/" + this.state.files[0].name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        document.getElementById("new-img").src = url;
        localStorage.setItem("patientImage", url);
      });
  };

  render() {
    return (
      <div className={styles.UploadImage}>
        <p className="lead">Upload patient's image</p>
        <Input
          changed={(e) => this.inputChangedHandler(e.target.files)}
          elementConfig={{ type: "file", capture: true }}
        />
        <div className={styles.ButtonHolder}>
          <button
            type="button"
            onClick={this.uploadImageHandler}
            disabled={!this.state.files}
          >
            Upload
          </button>
        </div>
        <img id="new-img" alt="uploaded user." />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPatientImage: () =>
      dispatch(actionCreators.checkPatientImageUpload()),
    onResetPatientImage: () =>
      dispatch(actionCreators.resetPatientImageUpload()),
  };
};

export default connect(null, mapDispatchToProps)(UploadImage);
