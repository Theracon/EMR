import React from "react";

import styles from "./UserPhoto.module.css";

const Image = (props) => {
  return (
    <div>
      <img
        className={props.class || styles.Img}
        src={props.imageURL}
        style={props.style}
        alt="User."
      />
    </div>
  );
};

export default Image;
