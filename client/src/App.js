import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Components/Home/Home.js";
import Products from "./Components/Products/Products.js";
import Product from "./Components/Product/Product.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import AfterOrder from "./Components/Order/AfterOrder";
import History from "./Components/History/History";
import Auth from "./Components/Auth/Auth";
import ThemeContext from "./ThemeContext.js";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [theme, setTheme] = useState("");

  const data = {
    theme,
    setTheme,
  };

  useEffect(() => {
    document.body.className = theme;
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (sessionStorage.getItem("theme")) {
      setTheme(sessionStorage.getItem("theme"));
    } else {
      setTheme("light");
      sessionStorage.setItem("theme", "light");
    }
  }, []);
  return (
    <ThemeContext.Provider value={data}>
      <HelmetProvider>
        <div className={`app`}>
          <Helmet>
            <title>Vagadrea Ecommerce</title>
            <meta
              name="description"
              content="A fullstack ecommerce web app built with Mern stack"
            />
            <meta
              name="keywords"
              content="HTML, CSS, JavaScript, React, ReactJS, Fullstack, Ecommerce, MERN"
            />
            <meta name="author" content="Vagadrea" />
          </Helmet>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header /> <Home /> <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/search"
                element={
                  <>
                    <Header /> <Products /> <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/product/:id"
                element={
                  <>
                    <Header /> <Product />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  <>
                    <Header /> <Cart />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/order"
                element={
                  <>
                    <Header /> <Order />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/payment"
                element={
                  <>
                    <AfterOrder />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/auth"
                element={
                  <>
                    <Auth />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path="/history"
                element={
                  <>
                    <Header />
                    <History />
                    <Footer />
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </HelmetProvider>
    </ThemeContext.Provider>
  );
}

export default App;
