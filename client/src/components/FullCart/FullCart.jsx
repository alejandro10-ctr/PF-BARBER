import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../Shopping/ShoppingCart";
import { Link } from "react-router-dom";
import { getDBCart, getDBCartValidateStock, getLocalStorage, getPaymentLink } from "../../redux/actions";
import { Redirect } from 'react-router-dom'
import style from './FullCart.module.css'

export default function ItemCart() {
  const { userId, deleteItemToCart, subtractItemToCart, addItemToCart } = useContext(CartContext)
  const dispatch = useDispatch()

  const [update, setUpdate] = useState(true)
  const cart = useSelector((state) => state.cart)
  const cartoutstock = useSelector((state) => state.cartoutstock)
  let pay = useSelector((state) => state.payMercadoPago)

  useEffect(() => {
    if (update) {
      if (userId) {
        dispatch(getDBCart(userId))
      } else {
        dispatch(getLocalStorage())
      }
      setUpdate(false)
    }
  }, [update])
  useEffect(() => {
    setUpdate(true)
  }, [userId])


  useEffect(() => {
    console.log(pay, typeof cartoutstock)
    if (!Object.keys(pay).length && typeof cartoutstock !== 'undefined' ? !cartoutstock.length : false) {
      dispatch(getPaymentLink(0, userId))
    }
  }, [cartoutstock])


  useEffect(() => {
    setUpdate(true)
  }, [userId])

  let total = 0
  const redireccionar = () => {
    window.open(pay.init_point+"", "Mercado pago", "width=800, height=500")
    console.log("Redireccionando...");

  }


  return (

    <div className={style.box}>
      <h1 className={style.title}>You Cart</h1>

      <div className={style.container}>

        <h5 className={style.subtitle}>Name </h5>
        <h5 className={style.subtitle}>Image</h5>
        <h5 className={style.subtitle}>Price</h5>
        <h5 className={style.subtitle}>Stock </h5>
        <h5 className={style.subtitle}>Quantity </h5>
        <h5 className={style.subtitle}>Quality </h5>
        <h5 className={style.subtitle}>Score </h5>
        <h5 className={style.subtitle}>Total</h5>
        <br></br>

      </div>

      {cart.length ?
        cart.map((productInCart) => {

          total += productInCart.product.price * productInCart.quantity

          return (
            <div key={productInCart.product.id} className={style.containerItem}>
              {cartoutstock?.map(itemOutStock => {
                if (itemOutStock.id === productInCart.id && itemOutStock.quantity > itemOutStock.product.stock) {

                  return <h2 key={productInCart.product.id} style={{ color: 'red' }}>Not in stock</h2>
                }
              })}
              <div className={style.containerItem}>
                <h3 className={style.text}>{productInCart.product.name}</h3>
                <img src={productInCart.product.image} className={style.tamanoimg} alt="img product" />
                <h3 className={style.price}>{productInCart.product.price}</h3>
                <h3>{productInCart.product.stock}</h3>
                <h3> {productInCart.product.quality}</h3>
                <h3> {productInCart.product.score}</h3>

                <button onClick={async (e) => {
                  e.preventDefault()
                  await subtractItemToCart(productInCart.product)
                }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" className="bi bi-cart-dash" viewBox="0 0 16 16">
                    <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg></button>
                <h3> {productInCart.quantity}</h3>
                <button onClick={async (e) => {
                  e.preventDefault()
                  console.log(e)
                  await addItemToCart(productInCart.product)
                }}> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg> </button>
                <h5>{productInCart.product.price * productInCart.quantity}</h5>
                <button onClick={async (e) => {
                  e.preventDefault()
                  await deleteItemToCart(productInCart.product)

                }}> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" className="bi bi-cart-x" viewBox="0 0 16 16">
                    <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg> </button>
              </div>
            </div>
          )
        })
        :
        <div><h1>No hay nada en el carrito</h1></div>
      }
      <div>
        <h3>Total to pay ${total}</h3>
        {Object.keys(pay).length ? <a id="gopay" className={style.button} target="_blank" rel="noopener" href={pay.init_point + ""} onClick={redireccionar()}>GO PAY</a>
          :
          userId ?
            <button className={style.button} onClick={(e) => {
              e.preventDefault()
              if (cart.length) {
                dispatch(getDBCart(userId))
                dispatch(getDBCartValidateStock(userId))
              }
            }}>BUY NOW</button>
            : <Link to='/login'><button className={style.button}> Iniciar sesión para comprar</button></Link>
        }

      </div>
    </div>

  )


};