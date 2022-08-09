import React from "react";
import "./CartItem.css";
import { useDispatch } from "react-redux";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../Store/features/cart/cartSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(item));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(item));
  };

  const handleRemove = () => {
    dispatch(removeItem(item));
    toast.success("The product has been successfully removed from the cart", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className="cartitem">
      <div className="cartitem__container">
        <img src={item.imgs[0]} alt=""></img>
        <p className="cartitem__name">{item.title}</p>
      </div>

      <div className="cartitem__quantity">
        <button className="cartitem__decrease" onClick={() => handleDecrease()}>
          -
        </button>
        <p className="cartitem__count">{item.cartQuantity}</p>
        <button className="cartitem__increase" onClick={() => handleIncrease()}>
          +
        </button>
      </div>

      <p className="cartitem__totalamount">${item.price * item.cartQuantity}</p>
      <DeleteForeverRoundedIcon
        className="cartitem__delete__icon"
        onClick={() => handleRemove()}
      />
      <ToastContainer />
    </div>
  );
};

export default CartItem;
