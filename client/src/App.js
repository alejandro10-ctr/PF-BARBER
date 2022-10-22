import React from "react";
import { Route } from "react-router-dom";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";



import MercadoPago from "./components/MercadoPago/MercadoPago";

import Register from "./components/Register/Register.jsx";
import LoginUser from "./components/LoginUser/LoginUser";


import "./App.css";

import { CartProvider } from "./components/Shopping/ShoppingCart"
//import { createProducts, getProducts } from "./store/actions";
//import ShoppingCart from "./components/Shopping/ShoppingCart";
//import ProductItem from "./components/Shopping/ProductsItem";
//import CartItem from "./components/Shopping/CartItem";
// Top level App component
//import { ProvideAuth } from "./use-auth.js";
//holi

function App() {
  return (
    <CartProvider>
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/login">
        <LoginUser />
      </Route>

      <Route exact path="/shop">
        <Ecommerce />
      </Route>
      <Route exact path="/aboutus">
        <AboutUs />
      </Route>


      <Route exact path="/payments/pay">
        <MercadoPago />
      </Route>

      <Route exact path="/product/:id"
        render={({match}) => {
          return <DetailProduct match={match} />
        }}>
      </Route>

{/* <ProvideAuth>
 */} {/*      <Route exact path="/yourCart/:id"
        render={({match}) => {
          return <ShoppingCart match={match} />
        }}>
      </Route>
 */}

    {/*   <Route exact path="/prodItem">
        <ProductItem />
      </Route> */}
{/*    </ProvideAuth> */}


      <Route
        exact
        path="/product/:id"
        render={({ match }) => {
          return <DetailProduct match={match} />;
        }}
      ></Route>


    </div>
    </CartProvider>
  );
}

export default App;
