import React, { useState } from "react";
import { addtocard, removeitem } from "./helper/Cardhelper";
import Imagehelper from "./helper/Imagehelper";
import { successAnimation } from "./Animation";

const Card = ({
  product,
  addToCard = true,
  removeFromCard = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [addProduct, setAddProduct] = useState(false);

  const showAddToCard = (addToCard) => {
    return (
      addToCard && (
        <button
          className="btn btn-success form-control rounded bolck m-1"
          onClick={() => {
            addtocard(product);
            setAddProduct(true);
          }}
          disabled={addProduct}
        >
          Add
        </button>
      )
    );
  };
  const showRemoveFromCard = (removeFromCard) => {
    return (
      removeFromCard && (
        <button
          className="btn btn-danger form-control rounded bolck m-1"
          onClick={() => {
            removeitem(product._id);
            setReload(!reload);
          }}
        >
          Remove
        </button>
      )
    );
  };

  return (
    <div className="card" style={{ width: "194px" }}>
      {addProduct ? (
        successAnimation(
          `Add product  `,
          "alert alert-success container m-auto "
        )
      ) : (
        <h5 className="text-muted text-center">{product.name}</h5>
      )}

      <Imagehelper product={product} />
      <div className="card-body">
        <p className="text-dark">{product.description}</p>
        Rs. ${product.price}
        <div className="card-text text-dark">
          {showAddToCard(addToCard)}
          {showRemoveFromCard(removeFromCard)}
        </div>
      </div>
    </div>
  );
};

export default Card;
