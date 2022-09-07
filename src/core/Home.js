import React, { useState, useEffect } from "react";
import { getallproducts } from "../admin/helper/adminhelper";
import Banner from "./Banner";
import Base from "./Base";
import Card from "./Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = () => {
    setLoading(true);
    getallproducts().then((data) => {
      if (data.error) {
        window.alert("Something worng");
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Base className="text-white mt-5">
      {loading ? (
        <div className="container text-center mt-5">
          <div
            className="spinner-border"
            // style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Banner />
          <h3 className="m-4 text-center">Let’s get visual </h3>
          <div className="d-flex flex-wrap">
            {products.map((product, index) => {
              return <Card product={product} key={index} />;
            })}
          </div>
        </>
      )}
    </Base>
  );
};

export default Home;
