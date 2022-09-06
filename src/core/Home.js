import React, { useState, useEffect } from "react";
import { getallproducts } from "../admin/helper/adminhelper";
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
    <Base title="Fly Buy , shopping" className="text-white mt-4">
      {loading ? (
        <div className="container text-center mt-5">
          <div
            className="spinner-border"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-auto">
          {products.map((product, index) => {
            return (
              <div className="col c-cart p-2 m-1 text-dark" key={index}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      )}
    </Base>
  );
};

export default Home;
