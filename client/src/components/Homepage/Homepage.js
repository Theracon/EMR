import React from "react";

import styles from "./Homepage.module.css";

const homepage = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className={styles.ContentHolder}>
          <div className={styles.Content}>
            <h3 className="text-muted">Content</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <span className={styles.Icon}>
              <i className="fas fa-hospital-user text-muted"></i>
            </span>
          </div>
          <div className={styles.Content}>
            <h3 className="text-muted">Content</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <span className={styles.Icon}>
              <i className="fas fa-hospital-user text-muted"></i>
            </span>
          </div>
          <div className={styles.Content}>
            <h3 className="text-muted">Content</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
            <span className={styles.Icon}>
              <i className="fas fa-hospital-user text-muted"></i>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default homepage;
