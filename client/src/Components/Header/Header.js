import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productSlice from "../../Store/features/products/productsSlice.js";
import axios from "axios";
import logo from "../../Assets/images/logo.png";
import ThemeContext from "../../ThemeContext.js";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const { theme, setTheme } = useContext(ThemeContext);

  const cart = useSelector((state) => state.cart);

  let user = JSON.parse(window.sessionStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout").then(() => {
        window.sessionStorage.removeItem("user");
        window.location.reload();
        navigate("/");
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(productSlice.actions.search(searchTerm));

    searchTerm ? navigate(`/search?term=${searchTerm}`) : navigate(`/search`);
  };

  const switchMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="header" styles={theme} key="header">
      <img
        className="header__logo"
        src={
          logo
        }
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        <SearchIcon
          className="header__searchIcon"
          onClick={(e) => handleSearch(e)}
        />
      </div>
      <div className={`header__menu`}>
        <button className="header__menu__item" onClick={() => switchMode()}>
          {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
        <button
          className="header__menu__item border-animation"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        {user ? (
          <>
            <button
              className="header__menu__item border-animation "
              onClick={() => navigate("/history")}
            >
              History
            </button>

            <button
              className="header__menu__item border-animation "
              onClick={() => handleLogout()}
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            className="header__menu__item border-animation"
            onClick={() => navigate("/auth")}
          >
            Login
          </button>
        )}
        <button
          className="header__menu__item"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCartCheckoutIcon className="cart__icon" />
          <span className="header__menu__quantity">
            {cart.cartTotalQuantity}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
