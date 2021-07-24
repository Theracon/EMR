import * as actionTypes from "../action-types/index";

export const toggleFilterControls = () => {
  return { type: actionTypes.TOGGLE_FILTER_CONTROLS };
};

export const hideFilterControls = () => {
  return { type: actionTypes.HIDE_FILTER_CONTROLS };
};
