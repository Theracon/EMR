import React from "react";

import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  let invalidClass = "";

  if (!props.isValid && props.touched) {
    invalidClass = styles.Invalid;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={`${styles.Input} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={`${styles.Textarea} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={`${styles.Input} ${invalidClass}`}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((optionProp) => (
            <option key={optionProp.value} value={optionProp.value}>
              {optionProp.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={`${styles.Input} ${invalidClass}`}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return <div className={styles.InputDiv}>{inputElement}</div>;
};

export default input;
