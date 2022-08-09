import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../Store/features/products/productSlice.js";
import ProductList from "../ProductList/ProductList";
import "./Product.css";
import { addToCart } from "../../Store/features/cart/cartSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const productState = useSelector((state) => state.product);
  const similarProducts = useSelector((state) => state.product.similarProducts);

  const [mainImage, setMainImage] = useState("");
  const [color, setColor] = useState("");

  const handleAddToCart = (product) => {
    const tempProduct = { ...product, color };
    dispatch(addToCart(tempProduct));
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

  const swapImages = (img) => {
    setMainImage(img);
  };

  useEffect(() => {
    dispatch(getProduct(id)).then((response) => {
      setMainImage(response.payload.product.imgs[0]);
    });
  }, [id]);

  if (productState.status === "succeeded") {
    return (
      <div className="product">
        <div className="product__wrapper">
          <div className="product__image__wrapper">
            <img
              className="product__image"
              src={mainImage === "" ? productState.data.imgs[0] : mainImage}
              alt=""
            />
            {productState.data.imgs.length > 1 && (
              <div className="product__small__images">
                {productState.data.imgs
                  .filter((img) => img !== mainImage)
                  .map((img, i) => (
                    <img
                      className="product__small__image"
                      src={img}
                      alt=""
                      onClick={() => swapImages(img)}
                      key={i}
                    />
                  ))}
              </div>
            )}
          </div>

          <div className="product__details">
            <div className="product__name">
              <p>{productState.data.title}</p>
            </div>
            <button
              className="product__addToCard"
              onClick={() => handleAddToCart(productState.data)}
            >
              Add To Cart
            </button>
            <ToastContainer />
            <div className="product__row">
              <p className="product__price">${productState.data.price}</p>
              <div className="product__colors">
                <button className="dropbtn">
                  {color === "" ? "Color" : color}
                  <span>&#9660;</span>
                </button>
                <div className="dropdown-content">
                  {productState.data.color.map((color, i) => (
                    <span onClick={() => setColor(color)} key={i}>
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="product__description">
              <p>{productState.data.description}</p>
            </div>
          </div>
        </div>
        <div className="similarProducts">
          <ProductList
            products={similarProducts}
            status={productState.status}
          />
        </div>
      </div>
    );
  }
};

export default Product;
