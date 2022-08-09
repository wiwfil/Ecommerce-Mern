import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import CartItem from "./CartItem";
import { getStripe } from "../../Store/features/cart/cartSlice.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const handleClick = () => {
    dispatch(getStripe(cartTotalAmount)).then(() => {
      navigate("/order");
    });
  };
  useEffect(() => {
    if (cartTotalAmount === 0) {
      setDisabled(true);
    }
  }, [cartTotalAmount]);
  return (
    <div className="cart">
      <div className="cart__main">
        {" "}
        <h1>My Cart</h1>
        <div className="cart__products">
          {cartItems.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>
      </div>

      <div className="cart__checkout">
        <p className="cart__checkout__title">
          Total ${cartTotalAmount.toFixed(2)}
        </p>
        <button
          className="order__button"
          onClick={() => handleClick()}
          disabled={disabled}
        >
          ORDER NOW
        </button>
      </div>
    </div>
  );
};

export default Cart;
