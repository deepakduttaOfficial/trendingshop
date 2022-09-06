import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { deleteproduct, getallproducts } from "./helper/adminhelper";

const Manageproducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticate();

  const getProducts = () => {
    getallproducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const listProducts = () => {
    return (
      <div className="container text-white mb-5">
        <Link
          className="btn btn-primary text-white rounded mb-2"
          replace
          to={`/admindashboard`}
        >
          Manage products
        </Link>
        <table className="table table-dark table-striped text-white mb-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{product.name}</td>
                  <td>
                    <Link
                      className="nav-link"
                      to={`/admindashboard/manage/product/update/${product._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary rounded"
                      onClick={() => {
                        deleteproduct(user._id, token, product._id).then(
                          (data) => {
                            if (data.error) {
                              console.log(data.error);
                            } else {
                              window.alert(
                                `${product.name} product was delete`
                              );
                              getProducts();
                            }
                          }
                        );
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return <Base title="Manage all products">{listProducts()}</Base>;
};

export default Manageproducts;
