import React, { useEffect } from "react";
import { createOrder } from "../../Store/features/order/orderSlice.js";
import { clearState } from "../../Store/features/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import "./AfterOrder.css";
import DoneIcon from "@mui/icons-material/Done";

const AfterOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderItems = window.sessionStorage.getItem("order");

  const handleClick = async () => {
    window.sessionStorage.removeItem("order");
    navigate("/");
  };
  useEffect(() => {
    if (orderItems !== null) {
      dispatch(createOrder(JSON.parse(orderItems)));
    }

    dispatch(clearState(""));

    window.sessionStorage.removeItem("cartState");
    window.sessionStorage.removeItem("cartItems");
  }, []);

  return orderItems ? (
    <div className="afterorder">
      <DoneIcon className="afterorder__icon" />
      <h2>Payment Successful !</h2>
      <button onClick={() => handleClick()}>Continue Shopping</button>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AfterOrder;
