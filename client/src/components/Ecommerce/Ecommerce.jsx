import { useEffect } from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import React, { useState } from "react";
import Paginado from "../Paginado/Paginado.jsx";
import {
  getProducts,
  createProducts,
  sortLower,
  scoreHigh,
  scoreLower,
  sortHigh,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";

const Productos = ({ products, getProducts}) => {
  
  const [state, setState] = useState(true)
  useEffect(() => {
    if(state){
      console.log("consolo")
      setState(false)
      getProducts()
    }
  }, [state]);

  return (
    <div>
      <div>
        <button onClick={e=>{
          e.preventDefault()
          setState(true)
        }}>actualizar</button>
        {products.length}
        {products.length === 0 && <h1>We dont Have that product!</h1>}
        {products.map((e) => {
          return (
            <div key={e.id}>
              <img src={e.image} alt="img"></img>
              <h2>{e.name}</h2>
              <h3>Price: ${e.price}</h3>
              <h3>Stock: {e.stock}</h3>
              <Link to={`/product/${e.id}`}>Detail Product</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const mapStateToProps = ({ products }) => {
  return {
    products
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProducts, createProducts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
