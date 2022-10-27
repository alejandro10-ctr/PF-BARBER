import React from "react";
import { Route } from "react-router-dom";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import { createProducts, getProducts } from "./store/actions";
import ShoppingCart from "./components/Shopping/ShoppingCart";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
<<<<<<< HEAD
import HomeNavBar from "./components/HomeNavBar/HomeNavBar.jsx";
=======
import List from "./components/Dashboard/List/List.jsx"

import HomeNavBar from "./components/HomeNavBar/HomeNavBar"
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ddbfd63 (datatable y navbar fuera de /dash)
=======
import Products from "./components/Dashboard/Products/Products.jsx"
import "./App.css";
import ItemCart from "./components/FullCart/FullCart";
import New from "./components/Dashboard/UploadFiles/UploadFiles";
import { inputs } from "./components/Dashboard/UploadFiles/formSource";
>>>>>>> fac7a69 (un buen commit)

=======
import Products from "./components/Dashboard/Products/Products.jsx"
>>>>>>> 0d0c47e (buenos cambios)
import "./App.css";
//holi
var URLactual = window.location;
<<<<<<< HEAD
=======


>>>>>>> ddbfd63 (datatable y navbar fuera de /dash)

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
      <Route exact path="/">
        <Home />
      </Route>
=======
{!URLactual.pathname.includes("/dash") ?     <Route path="/" render={({ location }) => {
=======
      {!URLactual.pathname.includes("/dash") ? <Route path="/" render={({ location }) => {
>>>>>>> 0d0c47e (buenos cambios)
        return <HomeNavBar user={user} pathname={location.pathname} />
      }}>

      </Route> : null}

      <Route exact path="/dash/users">
        <List />
      </Route>
      <Route exact path="/dash/products">

              <Products/>
        
      </Route>

      <Route exact path="/dash">
        <Dashboard />
      </Route>
      <Route exact path = "/dash/products/add">
        <New inputs ={inputs} title = "Add new product"/>
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

>>>>>>> ddbfd63 (datatable y navbar fuera de /dash)
      <Route exact path="/shop">
        <Ecommerce />
      </Route>
      <Route exact path="/aboutus">
        <AboutUs />
      </Route>

      <Route
        exact
        path="/product/:id"
        render={({ match }) => {
          try {
            return (
              <DatosDeEnvio addressId={Math.round(match.params.addressId)} />
            );
          } catch (error) {
            Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: error,
            });
          }
        }}
      ></Route>

      <Route exact path="/dash">
        <Dashboard />
      </Route>

      {/* <Route path="/" render={({ location }) => {
        return <HomeNavBar user={user} pathname={location.pathname} />
      }}> </Route> */}

      {/* <Route path = "/">
      <HomeNavBar />
      </Route> */}
    </div>
  );
}

export default App;
