import React from "react";
import Select from "react-select";
import { connect } from "react-redux";

import * as encounterActionCreators from "../../../store/action-creators/encounter";

class MultiSelect extends React.Component {
  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onSetReceivers(selectedOption);
  };

  render() {
    return (
      <Select
        isMulti
        name="colors"
        options={this.props.options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={this.handleChange}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetReceivers: (receivers) =>
      dispatch(encounterActionCreators.setReceivers(receivers)),
  };
};

export default connect(null, mapDispatchToProps)(MultiSelect);
