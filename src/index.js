import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SpcChart from "./organisms/spc_chart";
import * as serviceWorker from "./serviceWorker";

const el = <SpcChart />;

ReactDOM.render(el, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Used for module import of component as a node module
export default e => {
  return <SpcChart {...e} />;
};
