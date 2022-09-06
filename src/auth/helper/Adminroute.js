import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from ".";

const Adminroute = ({ Component }) => {
  const admin = isAuthenticate() && isAuthenticate().user.role === 1;
  return admin ? <Component /> : <Navigate to={`/signin`} />;
};

export default Adminroute;
