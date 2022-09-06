import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { authenticate, isAuthenticate, signin } from "../auth/helper";

// MODAL -----?-->

import { errorAnimation, loadingAnimation } from "../core/Animation";
import Base from "../core/Base";
import Geaustaccount from "./Geaustaccount";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    success: false,
    navigated: false,
  });
  const { email, password, error, loading, navigated } = values;
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      loading: false,
      success: false,
      navigated: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      navigated: false,
    });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          navigated: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            error: false,
            loading: true,
            navigated: true,
          });
        });
      }
    });
  };

  const signinForm = () => {
    return (
      <div className="container">
        <form className="m-auto col-md-7">
          <div className="mb-3">
            <label className="form-label">Email address :</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password :</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange("password")}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary block form-control"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? loadingAnimation() : "Submit"}
          </button>
        </form>
      </div>
    );
  };

  const navigatePerformed = () => {
    if (navigated) {
      if (isAuthenticate() && isAuthenticate().user.role === 1) {
        return <Navigate to={`/admindashboard`} />;
      } else {
        return <Navigate to={`/userdashboard`} />;
      }
    }
    if (isAuthenticate()) {
      return <Navigate to={`/`} />;
    }
  };

  return (
    <Base
      title="Sign in page"
      description="Here Sign in"
      className="text-white mt-5"
    >
      <Geaustaccount />
      {error ? errorAnimation(error) : ""}
      {signinForm()}
      {navigatePerformed()}
    </Base>
  );
};

export default Signin;
