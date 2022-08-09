/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Store/features/products/productsSlice.js";
import Filter from "../Filter/Filter.js";
import { useLocation } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const query = useLocation().search;
  const location = useLocation();
  const [page, setPage] = useState(1);
  let maxPage;

  const productsState = useSelector((state) => state.products);

  const loadMoreProduct = () => {
    dispatch(getProducts(`${query}&page=${page}`)).then(
      (res) => (maxPage = res.payload.pageSize)
    );
  };

  const handleScroll = (e) => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevstate) => {
        if (prevstate >= maxPage) {
          return prevstate;
        } else {
          return prevstate + 1;
        }
      });
    }
  };

  useEffect(() => {
    loadMoreProduct();
    window.addEventListener("scroll", handleScroll);
  }, [location]);

  useEffect(() => {
    loadMoreProduct();
  }, [page]);

  return (
    <div className="products" key="products">
      <Filter term={productsState.term} />
      <div className="products__column">
        <div className="products__searchedTerm">
          <p> Results </p>
        </div>
        <ProductList
          products={productsState.data}
          status={productsState.status}
        />
      </div>
    </div>
  );
};

export default Products;
