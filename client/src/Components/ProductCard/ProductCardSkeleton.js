import React from "react";
import "./ProductCard.css";
import { Skeleton } from "@mui/material";

const ProductCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className="product-card-skeleton" key={i}>
        <Skeleton width="250px" height={275} />

        <Skeleton width="150px" height="40px" />
        <Skeleton width="100px" height="40px" />
        <div className="productCard__footer">
          <div className="product-card-skeleton-button">
            <Skeleton width="90%" height="60px" />
          </div>
          <div className="product-card-skeleton-button">
            {" "}
            <Skeleton width="90%" height="60px" />
          </div>
        </div>
      </div>
    ));
};

export default ProductCardSkeleton;
