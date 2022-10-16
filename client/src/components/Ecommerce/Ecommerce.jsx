import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import React, { useState } from "react";

import Paginado from "../Paginado/Paginado.jsx";
import {
  getProducts,
  createProducts,
  priceLower,
  priceHigh,
  sortScore,
  filterQuality,
  filterShop,

} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";

const Productos = ({ products, getProducts, allProducts, filterstate }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState(true)
  useEffect(() => {
    if (state) {
      console.log("consolo")
      setState(false)
      getProducts()
    }
  }, [state]);


  //-----sort
  function handleSort(sort) {
    sort.preventDefault();
    if (sort.target.value === "lower") dispatch(priceLower(sort.target.value));
    else if (sort.target.value === "high") dispatch(priceHigh(sort.target.value));
  }

  //----score
  // function handleScore(score) {
  //   score.preventDefault();
  //   dispatch(sortScore(score.target.value))
  // }


  //-----filter
  function handleQuality(quality) {
    quality.preventDefault();
    dispatch(filterQuality(quality.target.value))
  }
  //----filter anidado
  function handleShop(shop) {
    shop.preventDefault()
    dispatch(filterShop(shop.target.value))
  }

  return (
    <div>
      <br />
      <div>
        <button onClick={e => {
          e.preventDefault()
          setState(true)
        }}>add</button><br /><br />
        {/* {products.length}
        {products.length === 0 && <h1>We dont Have that product!</h1>}       */}

        {/* Searchbar */}
        <SearchBar />

        {/* price sort */}
        <div>
          <label>Price </label>
          <select onChange={sort => handleSort(sort)}>
            <option hidden value=''>⇅</option>
            <option value='high'>+</option>
            <option value='lower'>-</option>
          </select>
        </div><br />



        {/* quality sort */}
        {/* <div>
          <label>Quality </label>
          <select defaultValue={'Options'} onChange={quality => handleQuality(quality)}>
            {/* <option hidden value="Options">Options</option>
            <option value="default">All</option>
            <option value="Premium">Premium</option>
            <option value="Basic">Basic</option> 
            
          </select>
        </div> */}




        <button id="All" name="All" value="default" onClick={quality => handleQuality(quality)}>All</button>


        <button id="Premium" name="Premium" value="Premium" onClick={quality => handleQuality(quality)}> Premium</button>


        <button id="Basic" name="Basic" value="Basic" onClick={quality => handleQuality(quality)}>Basic</button>






        {/* filter anidado */}
        <div>
          <label>Category</label>
          <select onChange={shop => handleShop(shop)}>
            <option hidden value="all">Shop</option>
            <option value="all">All</option>
            <option value="after shave">After Shave</option>
            <option value="razor">Razors</option>
          </select>
        </div>

        {/* score sort */}
        {/* <div>
        <label>Score</label>
        <select onChange={score => handleScore(score)}>
          <option hidden value=''>⇅</option>
          <option value='top'>+</option>
          <option value='bottom'>-</option>
        </select>
      </div> */}


        {/* card */}
        {products.length > 0 ?
          products.map((e) => {
            return (
              <div key={e.id}>
                <img src={e.image} alt="img"></img>
                <h2>{e.name}</h2>
                <h3>Price: ${e.price}</h3>
                <h3>Stock: {e.stock}</h3>
                <h3>Score: {e.score}</h3>
                <h3>Quality: {e.quality}</h3>
                <Link to={`/product/${e.id}`}>Detail Product</Link>
              </div>

            );
          }) : allProducts.map((e) => {
            return (
              <div key={e.id}>
                <img src={e.image} alt="img"></img>
                <h2>{e.name}</h2>
                <h3>Price: ${e.price}</h3>
                <h3>Stock: {e.stock}</h3>
                <h3>Score: {e.score}</h3>
                <h3>Quality: {e.quality}</h3>
                <Link to={`/product/${e.id}`}>Detail Product</Link>
              </div>);
          })

        }
      </div>
    </div>
  );
}

export const mapStateToProps = ({ products, allProducts, filterstate }) => {
  return {
    products,
    allProducts,
    filterstate
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProducts, createProducts, filterQuality }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Productos);
