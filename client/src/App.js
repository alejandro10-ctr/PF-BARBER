import React from "react";
import { Route } from "react-router-dom";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import { createProducts, getProducts } from "./store/actions";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Formu from "./components/Form/Form.jsx";

import Form from './components/Form/Form.jsx';


import "./App.css";
//holi

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Route exact path="/"><Home/></Route>
        
      <Route exact path="/shop"><Ecommerce /></Route>
        
      <Route exact path="/aboutus"><AboutUs /> </Route>
        
      <Route path='/register'><Form/></Route>

      <Route exact path="/product/:id"
        render={({match}) => {
          return <DetailProduct match={match} />
        }}>

=======
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/shop">
        <Ecommerce />
      </Route>
      <Route exact path="/aboutus">
        <AboutUs />
      </Route>
      <Route exact path="/register">
        <Formu />
>>>>>>> 30e58f27b34816d4748c053c6a376791d6bfef42
      </Route>

      <Route
        exact
        path="/product/:id"
        render={({ match }) => {
          return <DetailProduct match={match} />;
        }}
      ></Route>
    </div>
  );
}

export default App;
