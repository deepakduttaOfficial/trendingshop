import React, { useEffect, useState } from "react";
import Base from "./Base";
import { getallcards } from "./helper/Cardhelper";
import Card from "./Card";
import Stripe from "./Stripe";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(getallcards);
  }, [reload]);

  return (
    <Base title="Your products">
      <div className="d-flex flex-row">
        <div className="row row-cols-auto" style={{ width: "60%" }}>
          {localStorage.getItem("cart") ? (
            products.map((product, index) => {
              return (
                <div className="col c-cart p-2 m-1 text-dark" key={index}>
                  <Card
                    product={product}
                    addToCard={false}
                    removeFromCard={true}
                    setReload={setReload}
                    reload={reload}
                  />
                </div>
              );
            })
          ) : (
            <h1>No product here</h1>
          )}
        </div>
        <div className="text-center" style={{ width: "35%" }}>
          <Stripe products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
