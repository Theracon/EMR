import React from "react";

import styles from "./Searchbar.module.css";

class Searchbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ position: "relative" }}
      >
        <div className="container-fluid">
          <div className={styles.Div}>
            <form className={`d-flex ${styles.Form}`}>
              <input
                className={styles.Input}
                type="search"
                placeholder="Start typing to search..."
                onChange={(e) => this.props.getPatientsByName(e.target.value)}
              ></input>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Searchbar;
