import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import App from "./src/App";

import "./src/styles/reset.module.scss";
import "./src/styles/globalStyles.module.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
