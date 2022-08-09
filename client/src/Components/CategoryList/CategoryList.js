import React from "react";
import "./CategoryList.css";
import { useNavigate } from "react-router-dom";
import CategorySkeleton from "./CategorySkeleton";

const CategoryList = ({ categories, status }) => {
  const navigate = useNavigate();
  return (
    <div className="categoryList">
      {status === "succeeded" ? (
        categories.map((category) => (
          <div
            className="categoryList__card"
            key={category._id}
            onClick={() =>
              navigate(`/search/category=${category.title.toLowerCase()}`)
            }
          >
            <img className="categoryList__image" src={category.img} alt="" />
            <div className="categoryList__name">
              <p>{category.title}</p>
            </div>
          </div>
        ))
      ) : (
        <CategorySkeleton cards={4} />
      )}
    </div>
  );
};

export default CategoryList;
