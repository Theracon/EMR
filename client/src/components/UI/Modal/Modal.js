import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import StyleSheet from "./Modal.module.css";

class Modal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} click={this.props.modalClosed} />
        <div
          className={StyleSheet.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
