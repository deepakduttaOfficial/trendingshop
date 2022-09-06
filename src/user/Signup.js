import React, { useState } from "react";
import { isAuthenticate, signup } from "../auth/helper";
import { Link, Navigate } from "react-router-dom";
import {
  errorAnimation,
  loadingAnimation,
  successAnimation,
} from "../core/Animation";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    success: false,
  });

  const { name, email, password, success, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      loading: false,
      success: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      success: false,
    });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: false,
            loading: false,
            success: true,
          });
        }
      })
      .catch(console.log("Fail signup"));
  };

  const signupForm = () => {
    return (
      <div className="container">
        <form className="m-auto col-md-7">
          <div className="mb-3">
            <label className="form-label">Name :</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange("name")}
              value={name}
            />
          </div>
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
  const successMassage = () => {
    return (
      <>
        Sign up successfully, Plz
        <Link className="nav-link d-inline p-1 " replace to={`/signin`}>
          log in
        </Link>
        here .
      </>
    );
  };

  return (
    <Base
      title="Sign up page"
      description="Here Sign up"
      className="text-white mt-5"
    >
      {error ? errorAnimation(error) : ""}
      {success ? successAnimation(successMassage()) : ""}
      {signupForm()}
      {isAuthenticate() && <Navigate to={`/`} />}
    </Base>
  );
};

export default Signup;
