import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";
// import App from "./components/puredynamicindianform/Parent";
// import App from "./components/app/App";

// import App2 from "./components/formvalidation/Formies";
// import App3 from "./components/checkboxradio/Checkboxradio";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();