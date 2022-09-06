import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import { cartempty } from "./helper/Cardhelper";
import StripeCheckout from "react-stripe-checkout";
import { createorder } from "./helper/orderhelper";
import { stripehelper } from "./helper/Stripe";
import {
  successAnimation,
  errorAnimation,
  loadingAnimation,
} from "./Animation";

const Stripe = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
    address: "",
  });
  const { loading, success, error } = data;

  const jwtToken = isAuthenticate() && isAuthenticate().token;
  const userId = isAuthenticate() && isAuthenticate().user._id;

  const totalPrice = () => {
    let amount = 0;
    localStorage.getItem("cart") &&
      products.map((product) => (amount += product.price));
    return amount;
  };

  const makePayment = (token) => {
    setData({
      error: false,
      success: false,
      loading: true,
    });
    //Stripe helper
    stripehelper(token, products)
      .then((data) => {
        if (data.error) {
          setData({
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          const orderData = {
            products: products,
            transaction_id: data.id,
            amount: data.amount,
          };
          //Order Helper
          createorder(userId, jwtToken, orderData);
          setData({
            error: false,
            success: true,
            loading: false,
          });
          cartempty();
          setReload(!reload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showStripeButton = () => {
    return isAuthenticate() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
        token={makePayment}
        amount={totalPrice() * 100}
        name={`Buy t-Shart`}
        shippingAddress
        billingAddress
      >
        {" "}
        <button
          className="btn btn-success rounded form-control block"
          disabled={loading}
        >
          {loading ? loadingAnimation() : "Pay"}
        </button>
      </StripeCheckout>
    ) : (
      <Link to={`/signin`}>
        <button className="btn btn-success rounded form-control block">
          Signin
        </button>
      </Link>
    );
  };

  return (
    <div>
      <h4>
        {success &&
          successAnimation(
            "Successfully ordered",
            "alert alert-success container m-auto "
          )}
      </h4>
      <h4>
        {error && errorAnimation(error, "alert alert-danger container m-auto ")}
      </h4>
      <h4>Payment section </h4>
      Total Prize : ${localStorage.getItem("cart") && totalPrice()} <br />
      {totalPrice() === 0 ? <h4>Add product</h4> : showStripeButton()}
    </div>
  );
};

export default Stripe;
