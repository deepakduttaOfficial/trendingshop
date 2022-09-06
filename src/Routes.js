import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Admindashboard from "./user/Admindashboard";
import Userdashboard from "./user/Userdashboard";
// import Privateroute from "./auth/helper/Privateroute";
import Adminroute from "./auth/helper/Adminroute";
import Createcategory from "./admin/Createcategory";
import Createproduct from "./admin/Createproduct";
import Managecategories from "./admin/Managecategories";
import Manageproducts from "./admin/Manageproducts";
import Manageorders from "./admin/Manageorders";
import Updateproduct from "./admin/Updateproduct";

const AllRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        {/* Admin Routes  */}
        <Route
          path="/admindashboard"
          element={<Adminroute Component={Admindashboard} />}
        />
        <Route
          path="/admindashboard/create/category"
          element={<Adminroute Component={Createcategory} />}
        />
        <Route
          path="/admindashboard/create/product"
          element={<Adminroute Component={Createproduct} />}
        />
        <Route
          path="/admindashboard/manage/categories"
          element={<Adminroute Component={Managecategories} />}
        />
        <Route
          path="/admindashboard/manage/products"
          element={<Adminroute Component={Manageproducts} />}
        />
        <Route
          path="/admindashboard/manage/orders"
          element={<Adminroute Component={Manageorders} />}
        />
        <Route
          path="/admindashboard/manage/product/update/:productId"
          element={<Adminroute Component={Updateproduct} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRouters;
