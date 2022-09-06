import React, { useEffect, useState } from "react";
import { getallcategories, getallproducts } from "../admin/helper/adminhelper";
import { getallorders } from "../core/helper/orderhelper";
import { getallusers } from "./helper/userhelper";

const Total = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);

  const categories = () => {
    getallcategories().then((data) => {
      setCategory(data);
    });
  };
  const products = () => {
    getallproducts().then((data) => {
      setProduct(data);
    });
  };
  const users = () => {
    getallusers().then((data) => {
      setUser(data);
    });
  };
  const orders = () => {
    getallorders().then((data) => {
      setOrder(data);
    });
  };
  useEffect(() => {
    categories();
    products();
    users();
    orders();
  }, []);

  return (
    <div className="col-md-7 admin-parent-2">
      <div className="row ">
        {/* Cart here */}
        <div className="col-md-5 m-1  text-dark">
          <div className="card" style={{ width: "18rem", height: "160px" }}>
            <div className="card-body">
              <h5 className="card-title">Total Categories</h5>
              <h4 className="card-subtitle mt-4 text-center text-muted">
                {category.length}
              </h4>
            </div>
          </div>
        </div>
        {/* Cart here */}
        <div className="col-md-5 m-1  text-dark">
          <div className="card" style={{ width: "18rem", height: "160px" }}>
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <h4 className="card-subtitle mt-4 text-center text-muted">
                {product.length}
              </h4>
            </div>
          </div>
        </div>
        {/* Cart here */}
        <div className="col-md-5 m-1  text-dark">
          <div className="card" style={{ width: "18rem", height: "160px" }}>
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h4 className="card-subtitle mt-4 text-center text-muted">
                {user.length}
              </h4>
            </div>
          </div>
        </div>
        {/* Cart here */}
        <div className="col-md-5 m-1  text-dark">
          <div className="card" style={{ width: "18rem", height: "160px" }}>
            <div className="card-body">
              <h5 className="card-title"> total Orders</h5>
              <h4 className="card-subtitle mt-4 text-center text-muted">
                {order.length}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
