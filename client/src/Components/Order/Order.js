import React from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "../Order/CheckoutForm";
import getStripePromise from "../../lib/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import "./Order.css";

const Order = () => {
  const stripePromise = getStripePromise();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  return (
    <div className="order">
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} cartTotalAmount={cartTotalAmount} />
      </Elements>
    </div>
  );
};

export default Order;
