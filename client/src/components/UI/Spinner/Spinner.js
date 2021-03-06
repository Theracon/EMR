import React from "react";

import styles from "./Spinner.module.css";

const spinner = (props) => {
  return (
    <div className={styles.Loader} style={props.style}>
      Loading...
    </div>
  );
};

export default spinner;
