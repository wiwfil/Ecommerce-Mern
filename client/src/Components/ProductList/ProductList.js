import React from "react";
import "./ProductList.css";
import ProductCard from "../ProductCard/ProductCard.js";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton.js";

const ProductList = ({ products, status }) => {
  return (
    <div className="productList">
      {status === "succeeded" ? (
        products.map((product, i) => <ProductCard product={product} key={i} />)
      ) : (
        <ProductCardSkeleton cards={4} />
      )}
    </div>
  );
};

export default ProductList;
