import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "normalize.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "src/redux/store";

import {
  ReactReduxFirebaseProvider,
  ReactReduxFirebaseProviderProps,
} from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
// import reportWebVitals from './reportWebVitals';

firebase.initializeApp(firebaseConfig);

const rrfProps: ReactReduxFirebaseProviderProps = {
  firebase,
  config: {
    userProfile: "users",
  },
  dispatch: store.dispatch,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
