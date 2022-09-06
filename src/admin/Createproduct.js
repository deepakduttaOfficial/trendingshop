import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { createproduct, getallcategories } from "./helper/adminhelper";
import { successAnimation, errorAnimation } from "../core/Animation";
import { useNavigate } from "react-router-dom";

const Createproduct = () => {
  //Global
  const navigate = useNavigate();
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    photo: "",
    categories: [],
    error: false,
    succeess: false,
    loading: false,
    redirect: false,
    formData: "",
  });
  const {
    name,
    price,
    stock,
    description,
    photo,
    categories,
    error,
    succeess,
    loading,
    formData,
    redirect,
  } = values;

  //Category Section
  const getAllCategories = () => {
    getallcategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const categoryList = () => {
    return (
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleChange("category")}
      >
        <option>Select Category</option>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>
    );
  };
  // Product Section
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
      succeess: false,
      loading: false,
      redirect: false,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      succeess: false,
      loading: true,
      redirect: false,
    });
    createproduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          succeess: false,
          loading: false,
          redirect: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
          photo: "",
          error: false,
          succeess: true,
          loading: false,
          redirect: true,
        });
      }
    });
  };

  const createProductForm = () => {
    return (
      <form className="container text-dark col-md-6">
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image"
            onChange={handleChange("photo")}
            value={photo}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Product name"
            aria-label="default input example"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Product Price"
            aria-label="default input example"
            onChange={handleChange("price")}
            value={price}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Product Stock"
            aria-label="default input example"
            onChange={handleChange("stock")}
            value={stock}
          />
        </div>
        <div className="mb-3">{categoryList()}</div>
        <div className="mb-3">
          <textarea
            className="form-control"
            type="text"
            placeholder="Product description"
            aria-label="default input example"
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        {loading ? (
          <button
            class="btn btn-primary block form-control rounded"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            className="btn btn-primary block form-control rounded"
            onClick={onSubmit}
            disabled={succeess}
          >
            Add product
          </button>
        )}
      </form>
    );
  };

  return (
    <Base title="Add a product">
      {succeess && successAnimation("Product create successfully")}
      {error && errorAnimation(`${error}`)}
      {redirect &&
        setTimeout(() => {
          navigate("/admindashboard");
        }, 1000)}
      {createProductForm()}
    </Base>
  );
};

export default Createproduct;
