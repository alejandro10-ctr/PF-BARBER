import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/DetailProducts/DetailProducts";
import Ecommerce from './components/Ecommerce/Ecommerce';
import { createProducts, getProducts } from "./store/actions";
import ShoppingCart from "./components/Shopping/ShoppingCart";

function App() {
  return (
            <div className="App">
            <BrowserRouter>
            <Route exact path={'/'} component={Ecommerce}></Route>
            <Route patch ={'/products/:id'} component = {Product}></Route>
            </BrowserRouter>
            </div>

            );
            }

export default App;