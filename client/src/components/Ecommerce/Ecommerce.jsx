import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import React, { useState } from "react";
import s from './Ecommerce.module.css'

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


const[categorySelected, setCategory] = useState('all')



//paginado
  const[pag, setCurrentPage]= useState(1)// inicializacion
  const[productsPerPage, setPerPage] = useState(6) //cant x pag 
  const max = Math.ceil(products.length / productsPerPage); //max pag posible REDONDE HACIA ARRIBA 

  const sliceProduct = products.slice((pag - 1)* productsPerPage,
  ((pag - 1) * productsPerPage) + productsPerPage )// corte de elementos x pag


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
    dispatch(filterQuality(quality.target.value)) //all-basic-premium
    dispatch(filterShop(categorySelected))// (categorys context )

  }
  //----filter anidado
  function handleShop(shop) {
    shop.preventDefault()
    dispatch(filterShop(shop.target.value))
    setCategory(shop.target.value)
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
          <select className={s.select} onChange={sort => handleSort(sort)}>
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
          <select className={s.select} onChange={shop => handleShop(shop)}>
            <option hidden value="all">Shop</option>
            <option value="all">All</option>
            <option value="after shave">After Shave</option>
            <option value="razor">Razors</option>
          </select>
        </div>
        <Paginado  pag={pag}
                      setCurrentPage={setCurrentPage} 
                      max={max}/>
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
<div className={s.containerCard}>
{
sliceProduct.length > 0 ?
sliceProduct.map((e) => {
            return (
              
              <div className={s.products} key={e.id}>
                <img className={s.img} src={e.image} alt="img" ></img>
                <div className={s.productInfo}>
                <h2 className={s.productInfo}>{e.name}</h2>
                <h2>___</h2>
                <h3 className={s.productPrice}> ${e.price}</h3>
                <h3 className={s.productQuality}>Quality: {e.quality}</h3>
                </div>
                <Link to={`/product/${e.id}`} className={s.button}>BUY</Link>
              </div>
              

            );
          }) : allProducts.map((e) => {
            return (
              <div className={s.products} key={e.id}>
                <img className={s.img} src={e.image} alt="img"></img>
                <div className={s.productInfo}>
                <h2 className={s.productInfo}>{e.name}</h2>
                <h3 className={s.productPrice}> ${e.price}</h3>
                <h3>Quality: {e.quality}</h3>
               </div>
                <Link to={`/product/${e.id}`} className={s.button}>BUY</Link>
              </div>);
          })

        }
</div>
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
