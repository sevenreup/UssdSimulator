import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-simple-keyboard/build/css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UssdProvider } from "./context/UssdContext";

ReactDOM.render(
  <React.StrictMode>
    <UssdProvider>
      <App />
    </UssdProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
