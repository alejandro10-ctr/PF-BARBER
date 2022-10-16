import React from "react";
import { Route } from "react-router-dom";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import { createProducts, getProducts } from "./store/actions";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import "./App.css";
//holi

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Ecommerce />
      </Route>
      <Route exact path="/Home">
        <Home />
      </Route>
      <Route exact path="/AboutUs">
        <AboutUs />
      </Route>

      <Route exact path="/product/:id"
        render={({match}) => {
          return <DetailProduct match={match} />
        }}>

      </Route>
    </div>
  );
}

export default App;
