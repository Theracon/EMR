import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import authReducer from "./store/reducers/authentication";
import profileReducer from "./store/reducers/createProfile";
import patientsReducer from "./store/reducers/patients";
import userModeReducer from "./store/reducers/userModes";
import filterControlsReducer from "./store/reducers/filterControls";
import healthWorkersReducer from "./store/reducers/healthWorkers";
import encounterReducer from "./store/reducers/encounter";
import encountersReducer from "./store/reducers/encounters";
import messengerReducer from "./store/reducers/messenger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  patients: patientsReducer,
  userMode: userModeReducer,
  healthWorkers: healthWorkersReducer,
  encounter: encounterReducer,
  encounters: encountersReducer,
  filterControls: filterControlsReducer,
  messenger: messengerReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
