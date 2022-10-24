import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail, getDBCart, getPaymentLink, getDBUser } from "../../redux/actions";
import { CartContext } from "../Shopping/ShoppingCart";

import s from './DetailProducts.module.css'

import HomeNavBar from "../HomeNavBar/HomeNavBar";

// import styles from '../DetailProducts/DetailProducts.module.css';

function DetailProduct({ match }) {

  const { userId, addItemToCart, subtractItemToCart, deleteItemToCart } = useContext(CartContext)
  const [update, setUpdate] = useState(true)
  const [goPay, setGoPay] = useState(false)
  const dispatch = useDispatch();
  const id = Math.round(match.params.id);
  const product = useSelector((state) => state.detail)
  const cart = useSelector((state) => state.cart)
  let pay = useSelector((state) => state.payMercadoPago)

  function updateProductInCar() { return cart.find((productInCar) => productInCar.productId === Math.round(id)) }
  const [productInCar, setProducInCar] = useState(updateProductInCar())

  useEffect(() => {
    if (update) {
      dispatch(getProductsDetail(id))// accedo al id del detalle

      if (userId) {
        dispatch(getDBCart(userId))
      }
      setUpdate(false)
    }
  }, [update]) // muestra recien cuando el componente se monta

  useEffect(() => {

    if (cart.length) {
      console.log("cartDetailProduct", cart)
      setProducInCar(updateProductInCar())

      if (goPay) {
        Swal.showLoading()
        setTimeout(() => dispatch(getPaymentLink(id, userId)), 2000)
      }
    }
  }, [cart])
  useEffect(() => {

    if (Object.keys(pay).length) {
      setGoPay(false)
    }
  }, [pay])


  const user = useSelector((state) => state.user)


  useEffect(() => {
    if (userId) {
      dispatch(getDBUser(userId))
    }
  }, []);




  return (
    <div>
      <HomeNavBar user={user} />
      {/* <Link to="/">Back</Link> */}
      {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}

      <hr />
      <Link to="/shop"> See more products! </Link>


      {/* Card */}
      <div>
        {productInCar ? <button onClick={async (e) => {
          e.preventDefault()
          await deleteItemToCart(product)
        }}> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
            <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg> </button> : null}

        <h3>{product.name}</h3>
        <img src={product.image} alt={product.image} />
        <h3>Price: ${product.price}</h3>
        <h3>{product.quality}</h3>
        {console.log("productInCart", productInCar)}
        <div>

          {productInCar ? <button onClick={async (e) => {
            e.preventDefault()
            await subtractItemToCart(product)
          }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
              <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg></button> : null}
          {productInCar ? <button onClick={async (e) => {
            e.preventDefault()
            await addItemToCart(product)
          }}> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg> </button> : null}
          {productInCar ? <h3>Quantity {productInCar.quantity}</h3> : null}
        </div>

        {Object.keys(pay).length ? <a className={s.button} target="_blank" rel="noopener" href={pay.init_point + ""}>GO PAY</a>
          :
          userId ?
            <button className={s.button} onClick={(e) => {
              e.preventDefault()
              if (cart.length) {
                // const productInCar = cart.find((productInCar) => productInCar.productId === id)
                console.log(productInCar, cart)
                if (Object.keys(product).length) {
                  if (!productInCar?.quantity) Swal.showLoading()
                  setGoPay(true)
                  addItemToCart(product, productInCar?.quantity)
                }
              }
              else {
                if (Object.keys(product).length) {
                  setGoPay(true)
                  addItemToCart(product)
                }

              }
            }}>BUY NOW</button>
            : <h3>Inicia sesión para comprar</h3>
        }

      </div>


    </div>
  );
}
export default DetailProduct;
