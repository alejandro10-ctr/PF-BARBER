import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import React, { useEffect, useState, useContext } from "react";
import s from './Ecommerce.module.css'
import Paginado from "../Paginado/Paginado.jsx";
import ProductItem from "../Shopping/ProductsItem";
import { CartContext } from "../Shopping/ShoppingCart";

import {
  getProducts,
  createProducts,
  getDBUser,
  priceLower,
  priceHigh,
  filterQuality,
  filterShop,
  addToCart,
  delFromCart,
  getLocalStorage,
  getDBCart,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import HomeNavBar from "../HomeNavBar/HomeNavBar";


const Ecommerce = ({
  //-------> props
  products,
  filterstate,
  allProducts,
  cart,
  //<---------

  getProducts,
  createProducts,
  getDBUser,
  priceLower,
  priceHigh,
  filterQuality,
  filterShop,

  getLocalStorage,
  getDBCart,

}) => {
  let { userId, addItemToCart, subtractItemToCart, deleteItemToCart, } = useContext(CartContext)

  const [state, setState] = useState(true)
  useEffect(() => {
    if (state) {
      setState(false)
      getProducts()
      if (userId) {
        getDBCart(userId)
        getDBUser(userId)
      }
      else getLocalStorage()
    }
  }, [state]);


  const [categorySelected, setCategory] = useState('all')



  //paginado
  const [pag, setCurrentPage] = useState(1)// inicializacion
  const [productsPerPage, setPerPage] = useState(6) //cant x pag 
  products = products.filter(e => e.isActive !== false)
  const max = Math.ceil(products.length / productsPerPage); //max pag posible REDONDE HACIA ARRIBA 
  
  const sliceProduct = products.slice((pag - 1) * productsPerPage,
    ((pag - 1) * productsPerPage) + productsPerPage)// corte de elementos x pag


  //-----sort
  function handleSort(sort) {
    sort.preventDefault();
    if (sort.target.value === "lower") priceLower(sort.target.value);
    else if (sort.target.value === "high") priceHigh(sort.target.value);
  }

  //----score
  // function handleScore(score) {
  //   score.preventDefault();
  //   dispatch(sortScore(score.target.value))
  // }


  //-----filter
  function handleQuality(quality) {
    quality.preventDefault();
    filterQuality(quality.target.value) //all-basic-premium
    filterShop(categorySelected)// (categorys context )

  }
  //----filter anidado
  function handleShop(shop) {
    shop.preventDefault()
    filterShop(shop.target.value)
    setCategory(shop.target.value)
  }


  return (
    <div className={s.background}>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} />

        {/* price sort */}
        <div className={s.selectors}> 
        
        <button className={s.select} id="All" name="All" value="default" onClick={quality => handleQuality(quality)}>All</button>
        <button className={s.select} id="Premium" name="Premium" value="Premium" onClick={quality => handleQuality(quality)}> Premium</button>
        <button className={s.select} id="Basic" name="Basic" value="Basic" onClick={quality => handleQuality(quality)}>Basic</button>

          <label> Price </label>
          <select className={s.select} onChange={sort => handleSort(sort)}>
            <option hidden value=''>⇅</option>
            <option value='high'>+</option>
            <option value='lower'>-</option>
          </select>

          {/* filter anidado */}
          <label> Category</label>
          <select className={s.select} onChange={shop => handleShop(shop)}>
            <option hidden value="all">Shop</option>
            <option value="all">All</option>
            <option value="after shave">After Shave</option>
            <option value="razor">Razors</option>
          </select>

        </div><br />

        <Paginado className={s.paginado}pag={pag}
          setCurrentPage={setCurrentPage}
          max={max} />

        {/* card */}
        <div className={s.containerCard}>
          {
            sliceProduct.length > 0 ?
            sliceProduct.map((product) => {
              const findProductCar = cart.find(productInCar => productInCar.productId === product.id);
              return (
                <div className={s.products} key={product.id}>
                    <div>
                    <h2 className={s.productInfo}>{product.name}</h2>
                    <img className={s.img} src={product.image} alt="img" ></img>
                    <h4 >{product.quality.toUpperCase()}</h4>
                    </div>
                    <h3>{findProductCar?.quantity}</h3>
                    <div>
                      
                      <button className={s.carrito} onClick={async (e) => {
                        e.preventDefault()
                        await addItemToCart(product)
                      }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" >
                        <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg> </button>
                    <button className={s.carrito} onClick={async (e) => {
                      e.preventDefault()
                      await subtractItemToCart(product)
                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                        <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg></button>

                    <button className={s.carrito}onClick={async (e) => {
                      e.preventDefault()
                      await deleteItemToCart(product)
                    }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white">
                        <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg> </button>
                      </div>

                    <div className={s.productInfo}>
                      <h4 className={s.productPrice}> ${product.price}</h4>
                    </div>
                    <Link to={`/product/${product.id}`} className={s.button}>ADD</Link>
                  </div>

                );
              }) :

              allProducts.map((e) => {
                return (
                  <div className={s.products} key={e.id}>
                    {/*   <Link to={`/yourCart/${e.id}`} onClick={(id)=> addToCart(id)}>🛒</Link> */}
                    <button onClick={() => addItemToCart(e)}>🛒</button>
                    {/*  {
                    <ProductItem
                    id={e.id}
                    stock={e.stock}
                     quantity={e.quantity} 
                    />
                  } */}
                    <img className={s.img} src={e.image} alt="img"></img>
                    <div className={s.render}>
                      <h2>{e.name}</h2>
                      <h3> $ {e.price}</h3>
                      <h3>Quality: {e.quality}</h3>
                    </div>
                    {/* <Link to={`/product/${e.id}`} className={s.button}>BUY</Link> */}
                  </div>);
              })

          }
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = ({ products, allProducts, user, filterstate, cart }) => {
  return {
    products,
    allProducts,
    filterstate,
    cart
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts,
    createProducts,
    getDBUser,
    priceLower,
    priceHigh,
    filterQuality,
    filterShop,
    addToCart,
    delFromCart,
    getLocalStorage,
    getDBCart,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);