import React from "react";

import styles from "./Button.module.css";

const button = (props) => {
  return (
    <button
      className={styles[props.btnType]}
      disabled={props.btnDisabled}
      onClick={props.click ? props.click : null}
    >
      {props.children}
    </button>
  );
};

export default button;
