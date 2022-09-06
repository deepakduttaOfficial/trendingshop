import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import AllRouters from "./Routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AllRouters />
  </React.StrictMode>
);
