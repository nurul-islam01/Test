import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import store from "./reducers";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={false}
      pauseOnHover
    />
  </Provider>
);

reportWebVitals();
