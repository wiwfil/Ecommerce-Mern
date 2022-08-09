import React, { useState, useEffect } from "react";
import "./Filter.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategory } from "../../Store/features/categories/categorySlice.js";

const Filter = ({ term }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Allcategories = useSelector((state) => state.category.data);

  const query = useLocation().search;

  const [categories, setCategories] = useState();
  const [inStock, setInStock] = useState();
  const [colors, setColors] = useState([]);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sort, setSort] = useState("popularity");

  const filterColors = [
    "blue",
    "red",
    "white",
    "black",
    "gold",
    "green",
    "silver",
    "pink",
  ];

  const handleCategories = (e) => {
    let tempCategories = categories;

    if (!categories.includes(e.target.value)) {
      tempCategories.push(e.target.value);
    } else {
      tempCategories = tempCategories.filter(
        (category) => category !== e.target.value
      );
    }
    setCategories(tempCategories);
  };

  const handleColors = (e) => {
    let tempColors = colors;

    if (!colors.includes(e.target.value)) {
      tempColors.push(e.target.value);
    } else {
      tempColors = tempColors.filter((color) => color !== e.target.value);
    }
    setColors(tempColors);
  };
  const handleClear = (e) => {
    setCategories([]);
    setInStock(false);
    setColors([]);
    setMinPrice(null);
    setMaxPrice(null);
    navigate(`/search`);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    navigate(
      `/search?term=${term}${
        categories.length > 0 ? `&category=${categories}` : ""
      }${colors.length > 0 ? `&color=${colors}` : ""}${
        maxPrice ? `&price=${minPrice ? minPrice : 0}-${maxPrice}` : ""
      }${inStock ? "&instock=true" : ""}${`&sort=${sort}`}`
    );
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    setCategories(new URLSearchParams(query).get("category")?.split(",") || []);
    setInStock(new URLSearchParams(query).get("instock") || false);
    setColors(new URLSearchParams(query).get("color")?.split(",") || []);
    setMinPrice(new URLSearchParams(query).get("price")?.split("-")[0] || null);
    setMaxPrice(new URLSearchParams(query).get("price")?.split("-")[1] || null);
    setSort(new URLSearchParams(query).get("sort") || "popularity");
  }, [query]);

  return (
    <div className="filter" key={window.location.search}>
      <div className="filter__item">
        <label className="sort-label" htmlFor="sort">
          Sort by
          <select className="sort" onChange={(e) => setSort(e.target.value)}>
            <option className="sort-item" value="popularity">
              Popularity
            </option>
            <option className="sort-item" value="lh">
              Price: Low to High
            </option>
            <option className="sort-item" value="hl">
              Price: High to Low
            </option>
          </select>
        </label>
        <div className="filter__line"></div>
      </div>
      <div className="filter__item">
        <div className="filter__checkbox">
          <label htmlFor="inStock"> In Stock</label>
          <input
            className="filter__checkbox__input"
            type="checkbox"
            id="inStock"
            name="inStock"
            value="inStock"
            defaultChecked={inStock}
            onChange={(e) => {
              setInStock(e.target.checked);
            }}
          />
        </div>
        <div className="filter__line"></div>
      </div>
      <div className="filter__item">
        <div className="filter__item__title">
          <h5>Categories</h5>
        </div>
        <div className="filter__checkboxes" key={categories}>
          {Allcategories.map((category, i) => (
            <div className="filter__checkbox" key={i}>
              <label htmlFor={category.title}> {category.title}</label>

              <input
                className="filter__checkbox__input"
                type="checkbox"
                name={category.title}
                value={category.title}
                id={category.title}
                defaultChecked={
                  categories?.includes(category.title)
                    ? categories.includes(category.title)
                    : false
                }
                onChange={(e) => handleCategories(e)}
              />
            </div>
          ))}
        </div>
        <div className="filter__line"></div>
      </div>

      <div className="filter__item">
        <div className="filter__item__title">
          <h5>Price</h5>
        </div>
        <div className="filter__checkboxes">
          <div className="filter__price">
            <input
              className="filter__price__input"
              type="number"
              placeholder={minPrice ? minPrice : "min"}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <h6>-</h6>
            <input
              className="filter__price__input"
              placeholder={maxPrice ? maxPrice : "max"}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="filter__line"></div>
      </div>

      <div className="filter__item">
        <div className="filter__item__title">
          <h5>Color</h5>
        </div>
        <div className="filter__checkboxes" key={colors}>
          {filterColors.map((color, i) => (
            <div className="filter__checkbox" key={i}>
              <label htmlFor={color}> {color}</label>
              <input
                className="filter__checkbox__input"
                type="checkbox"
                id={i}
                name={color}
                value={color}
                defaultChecked={
                  colors?.includes(color) ? color.includes(color) : false
                }
                onChange={(e) => handleColors(e)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="filter__button__parent">
        <button className="filter__button" onClick={(e) => handleFilter(e)}>
          Filter
        </button>
      </div>
      <div className="filter__button__parent">
        <button className="filter__button" onClick={(e) => handleClear(e)}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filter;
