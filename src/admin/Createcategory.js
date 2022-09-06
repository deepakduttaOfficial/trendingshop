import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import {
  errorAnimation,
  loadingAnimation,
  successAnimation,
} from "../core/Animation";
import Base from "../core/Base";
import { createcategory } from "./helper/adminhelper";

const Createcategory = () => {
  const navigate = useNavigate();
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    loading: false,
    error: false,
    success: false,
    redirect: false,
    button: false,
  });
  const { name, loading, error, success, redirect, button } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      loading: false,
      error: false,
      success: false,
      redirect: false,
      button: false,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      success: false,
      redirect: false,
      button: false,
    });
    createcategory({ name }, user._id, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          loading: false,
          error: data.error,
          success: false,
          redirect: false,
          button: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          error: false,
          success: true,
          redirect: true,
          button: true,
          name: "",
        });
      }
    });
  };

  const createCategoryForm = () => {
    return (
      <div>
        {error ? errorAnimation(error) : ""}
        {success ? successAnimation("Category create Successfully") : ""}
        <div className="container mt-5">
          <Link
            className="btn btn-primary text-white rounded mb-2"
            replace
            to={`/admindashboard`}
          >
            Admin Dashboard
          </Link>
          <form className="m-auto col-md-7">
            <div className="mb-3">
              <label className="form-label">Enter Category Name :</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary block form-control"
              disabled={loading || button}
              onClick={onSubmit}
            >
              {loading ? loadingAnimation() : "Submit"}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Create Categories">
      {createCategoryForm()}
      {redirect
        ? setTimeout(() => {
            navigate("/admindashboard");
          }, 1000)
        : ""}
    </Base>
  );
};

export default Createcategory;
