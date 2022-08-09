import React from "react";
import "./CategoryList.css";
import { Skeleton } from "@mui/material";

const CategorySkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className="category-card-skeleton" key={i}>
        <Skeleton width="250px" height={275} />

        <Skeleton width="150px" height="80px" />
      </div>
    ));
};

export default CategorySkeleton;
