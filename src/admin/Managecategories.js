import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import {
  deletecategory,
  getallcategories,
  updatecategory,
} from "./helper/adminhelper";
import { successAnimation, errorAnimation } from "../core/Animation";
import { Link } from "react-router-dom";

const Managecategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState({
    name: "",
    _id: "",
  });

  const [values, setValues] = useState({
    name: "",
    error: false,
    loading: false,
    success: false,
    buttonEdit: false,
  });
  const { name, error, success, buttonEdit } = values;
  const { user, token } = isAuthenticate();

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
      loading: false,
      success: false,
      buttonEdit: false,
    });
  };

  const updateCategory = (categoryId) => {
    setValues({
      ...values,
      error: false,
      loading: true,
      success: false,
      buttonEdit: false,
    });
    updatecategory({ name }, categoryId, user._id, token).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          success: false,
          buttonEdit: false,
        });
      } else {
        setValues({
          ...values,
          error: false,
          loading: false,
          success: true,
          buttonEdit: true,
          name: "",
        });
      }
    });
  };

  const allCategories = () => {
    getallcategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    allCategories();
  }, [updateCategory]);

  const showCategoryName = (category) => {
    setCategoryName(category);
    setValues({
      ...values,
      error: false,
      loading: false,
      success: false,
      name: "",
    });
  };

  const popupUpdateCategory = (category) => {
    return (
      <td>
        <button
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            showCategoryName(category);
          }}
        >
          Edit
        </button>
        <div
          className="modal fade text-dark"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header col-md-12">
                <h5
                  className="modal-title "
                  style={{ width: "100%" }}
                  id="exampleModalLabel"
                >
                  {success &&
                    successAnimation(
                      `Category name update success fully`,
                      "alert alert-success container m-auto"
                    )}
                  {error &&
                    errorAnimation(
                      error,
                      "alert alert-danger container m-auto"
                    )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Update Category Name : {category.name}{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary rounded"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded"
                  onClick={() => {
                    updateCategory(categoryName._id);
                  }}
                  disabled={buttonEdit}
                >
                  update changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    );
  };

  //Delete Category
  const [categoryDelete, setCategoryDelete] = useState({
    name: "",
    _id: "",
    successDel: false,
    errorDel: false,
    massage: "",
    buttonDel: false,
  });

  const deleteClick = (deleteCategory) => {
    setCategoryDelete(deleteCategory);
  };
  const finalRemoveCategory = (categoryId) => {
    setCategoryDelete({
      successDel: false,
      errorDel: false,
      buttonDel: false,
    });
    deletecategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        setCategoryDelete({
          successDel: false,
          errorDel: data.error,
          buttonDel: false,
        });
      } else {
        setCategoryDelete({
          successDel: true,
          errorDel: false,
          buttonDel: true,
          massage: data.massage,
        });
      }
    });
  };

  const deleteCategory = (deleteCategory) => {
    return (
      <div className="text-dark">
        <button
          type="button"
          className="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalToggle"
          data-bs-whatever="@mdo"
          onClick={() => {
            deleteClick(deleteCategory);
          }}
        >
          Remove
        </button>
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  {categoryDelete.successDel &&
                    successAnimation(
                      categoryDelete.massage,
                      "alert alert-success container m-auto"
                    )}
                  {categoryDelete.errorDel &&
                    errorAnimation(
                      categoryDelete.errorDel,
                      "alert alert-danger container m-auto"
                    )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure ? Remove <b> {categoryDelete.name}</b> category{" "}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary rounded"
                  onClick={() => {
                    finalRemoveCategory(categoryDelete._id);
                  }}
                  disabled={categoryDelete.buttonDel}
                  data-bs-dismiss="modal"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const manageCategory = () => {
    return (
      <div className="container mt-5">
        <Link
          className="btn btn-primary text-white rounded mb-2"
          replace
          to={`/admindashboard`}
        >
          Admin Dashboard
        </Link>
        <table className="table table-dark table-striped text-white mb-5">
          <thead className="">
            <tr>
              <th scope="col" className="ps-4">
                #
              </th>
              <th scope="col">Categories</th>
              <th scope="col">Edit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          {categories.length > 0 ? (
            categories.map((category, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <th scope="row" className="ps-4">
                      {index}
                    </th>
                    <td>{category.name}</td>
                    {popupUpdateCategory(category)}
                    <td>{deleteCategory(category)}</td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <h1 className="text-white">No Category was found</h1>
          )}
        </table>
      </div>
    );
  };

  return <Base title="Manage all categories">{manageCategory()}</Base>;
};

export default Managecategories;
