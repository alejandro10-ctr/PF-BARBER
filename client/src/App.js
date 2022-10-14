import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home";
import { createProducts, getProducts } from "./store/actions";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import AboutUs from "./components/AboutUs/AboutUs";
//holi

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={"/"} component={Ecommerce}></Route>
        <Route patch={"/products/:id"} component={Product}></Route>
        <Route patch={"/Home"} component={Home}></Route>
        <Route patch={"/AboutUs"} component={AboutUs}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
