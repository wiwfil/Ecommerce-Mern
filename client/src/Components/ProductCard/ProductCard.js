import React from "react";
import { addToCart } from "../../Store/features/cart/cartSlice.js";
import { useDispatch } from "react-redux";
import "./ProductCard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    dispatch(addToCart(product));
    toast.success("The product has been successfully added to your cart", {
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
    <div className="productCard">
      <div className="productCard__wrapper">
        <img className="productCard__image" src={product.imgs[0]} alt="" />
      </div>
      <p className="productCard__title">{product.title}</p>
      <div className="productCard__price">
        <p>${product.price}</p>
      </div>
      <div className="productCard__footer">
        <button onClick={() => navigate(`/product/${product._id}`)}>
          More
        </button>
        <button onClick={() => handleAdd()}>Add To Cart</button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductCard;
