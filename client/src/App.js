import React, { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import Register from "./components/Register/Register.jsx";
import LoginUser from "./components/LoginUser/LoginUser";
import { CartContext } from "./components/Shopping/ShoppingCart";
import { getDBUser } from "./redux/actions";

import HomeNavBar from "./components/HomeNavBar/HomeNavBar"

import "./App.css";
import ItemCart from "./components/FullCart/FullCart";
import UserEdit from "./components/UserAccount/UserEdit";

//import { createProducts, getProducts } from "./store/actions";
//import ShoppingCart from "./components/Shopping/ShoppingCart";
//import ProductItem from "./components/Shopping/ProductsItem";
//import CartItem from "./components/Shopping/CartItem";
// Top level App component
//import { ProvideAuth } from "./use-auth.js";
//holi




function App() {
  let { userId } = useContext(CartContext)
  const dispatch = useDispatch()
  let user = useSelector(state => state.user)
  useEffect(() => {
    if (!Object.keys(user).length && userId) {
      dispatch(getDBUser(userId))
    }
  }, [user])
  return (
    <div className="App">

      <Route path="/" render={({ location }) => {
        return <HomeNavBar user={user} pathname={location.pathname} />
      }}>

      </Route>

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

      <Route exact path="/cart">
        <ItemCart />
      </Route>
      <Route exact path="/useredit">
        <UserEdit />
      </Route>

      <Route
        exact path="/product/:id"
        render={({ match }) => {
          return <DetailProduct match={match} />;
        }}
      />
    </div>
  );
}

export default App;
