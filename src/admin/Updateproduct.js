import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import {
  getallcategories,
  getproduct,
  updateproduct,
} from "./helper/adminhelper";
import { successAnimation, errorAnimation } from "../core/Animation";
import { Link, useNavigate, useParams } from "react-router-dom";

const Updateproduct = () => {
  //Global
  const { productId } = useParams();
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
  //UpdateCategory section
  const getProduct = (productId) => {
    getproduct(productId).then((data) => {
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
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          error: false,
          succeess: false,
          loading: false,
          redirect: false,
          formData: new FormData(),
        });
        getAllCategories();
      }
    });
  };
  //Category Section
  const getAllCategories = () => {
    getallcategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          succeess: false,
          loading: false,
          redirect: false,
        });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };
  useEffect(() => {
    getProduct(productId);
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
    updateproduct(productId, user._id, token, formData).then((data) => {
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

  const updateProductForm = () => {
    return (
      <form className="container text-dark col-md-6">
        <Link
          className="btn btn-primary text-white rounded mb-2"
          replace
          to={`/admindashboard/manage/products`}
        >
          Manage products
        </Link>
        <div className="mb-3">
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
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Product Price"
            onChange={handleChange("price")}
            value={price}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="number"
            placeholder="Product Stock"
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
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        {loading ? (
          <button
            className="btn btn-primary block form-control rounded"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
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
            Update product
          </button>
        )}
      </form>
    );
  };

  return (
    <Base title="Update  product">
      {succeess && successAnimation("Product Update successfully")}
      {error && errorAnimation(`${error}`)}
      {redirect &&
        setTimeout(() => {
          navigate("/admindashboard");
        }, 1000)}
      {updateProductForm()}
    </Base>
  );
};

export default Updateproduct;
