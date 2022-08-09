import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import Banner from "../Banner/Banner.js";
import CategoryList from "../CategoryList/CategoryList";
import "react-loading-skeleton/dist/skeleton.css";
import ProductList from "../ProductList/ProductList";
import { getPopularProducts } from "../../Store/features/products/productsSlice.js";
import { getPopularCategory } from "../../Store/features/categories/categorySlice.js";

const Home = () => {
  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.products);
  const categoryState = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getPopularCategory());
    dispatch(getPopularProducts());
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="home__column">
        <div className="home__texts">
          <span> Popular Products</span>
        </div>

        <ProductList
          products={productsState.data}
          status={productsState.status}
        />
        <div className="home__texts">
          <span> Popular Categories</span>
        </div>
        <CategoryList
          categories={categoryState.popularCategories}
          status={categoryState.status}
        />
      </div>
    </div>
  );
};

export default Home;
