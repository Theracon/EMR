import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  showControls: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FILTER_CONTROLS:
      return updateObject(state, { showControls: !state.showControls });
    case actionTypes.HIDE_FILTER_CONTROLS:
      return updateObject(state, { showControls: false });
    default:
      return state;
  }
};

export default reducer;
