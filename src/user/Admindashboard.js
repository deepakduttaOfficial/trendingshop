import React from "react";
import { NavLink } from "react-router-dom";
import Base from "../core/Base";
import Total from "./Total";

const Admindashboard = () => {
  return (
    <Base>
      <div className="p-3 admin-area ">
        <div className="row ">
          <div className="col-md-4 me-1 admin-parent-1">
            <h4 className="text-white p-2">Manage All products</h4>
            <div className="mt-3">
              <div className="mb-3 rounded admin-manage-area">
                <h6 className="p-2 pb-3 border-bottom">
                  1.{" "}
                  <NavLink
                    className={`text-white`}
                    to={`/admindashboard/create/category`}
                  >
                    Create Category
                  </NavLink>
                </h6>
              </div>
              <div className="mb-3 rounded admin-manage-area">
                <h6 className="p-2 pb-3 border-bottom">
                  2.
                  <NavLink
                    className={`text-white`}
                    to={`/admindashboard/manage/categories`}
                  >
                    Manage categories
                  </NavLink>{" "}
                </h6>
              </div>
              <div className="mb-3 rounded admin-manage-area">
                <h6 className="p-2 pb-3 border-bottom">
                  3.
                  <NavLink
                    className={`text-white`}
                    to={`/admindashboard/create/product`}
                  >
                    Create Product
                  </NavLink>{" "}
                </h6>
              </div>
              <div className="mb-3 rounded admin-manage-area">
                <h6 className="p-2 pb-3 border-bottom">
                  4.{" "}
                  <NavLink
                    className={`text-white`}
                    to={`/admindashboard/manage/products`}
                  >
                    Manage Products
                  </NavLink>{" "}
                </h6>
              </div>
              <div className="mb-3 rounded admin-manage-area">
                <h6 className="p-2 pb-3 border-bottom">
                  5.{" "}
                  <NavLink
                    className={`text-white`}
                    to={`/admindashboard/manage/orders`}
                  >
                    Manage Orders
                  </NavLink>{" "}
                </h6>
              </div>
            </div>
          </div>
          <Total />
        </div>
      </div>
    </Base>
  );
};

export default Admindashboard;
