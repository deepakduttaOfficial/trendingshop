import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from ".";

const Privateroute = ({ Component }) => {
  const auth = isAuthenticate();
  return auth ? <Component /> : <Navigate to={`/signin`} />;
};

export default Privateroute;
