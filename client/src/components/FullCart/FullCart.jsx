import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../Shopping/ShoppingCart";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import style from './FullCart.module.css'


import { addToCart, delFromCart, subtractItemToCart, getCart, getLocalStorage, getPaymentLink, clearFromCart, deleteItemToCart } from "../../redux/actions";
//import Swal from "sweetalert2"

export default function ItemCart() {
  const { userId, deleteItemToCart, subtractItemToCart, addItemToCart } = useContext(CartContext)
  const dispatch = useDispatch()

  const prods = useSelector((state) => state.cart)
  console.log(prods)
  const [update, setUpdate] = useState(true)
  const cart = useSelector((state) => state.cart)
  let pay = useSelector((state) => state.payMercadoPago)
  //  const navigate = useNavigate()
  //const updateDB = useSelector((state) => state.updateDB)
  const [cantidad, setCantidad] = useState(prods.map(el => el.quantity))
  /*  let matchProd = prods.map(
    (productInCart) => (productInCart.productId) === Math.round(id) ) */


  useEffect(() => {
    if (update) {
      //    Swal.showLoading()
      //  dispatch(getCart())
      dispatch(getLocalStorage())
      setUpdate(false)
    }
  }, [update])

  let total = 0


  /*       let arr =  prods.map((el) =>  el.product.price * el.quantity)
        console.log(arr)
        
        const total = arr.reduce((previousValue, currentValue) => previousValue + currentValue )
        console.log(total)
         */

  let prueba = prods.map(el => el.product)
  console.log(prueba)

  //   description
  //   id
  //   image
  //   name
  //   price
  //   quality
  //   score
  //   stock


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


      {prods ?
        prods.map((e) => {


          total = total + e.product.price

          return (


            <div key={e.product.id} className={style.containerItem}>
              <h3 className={style.text}>{e.product.name}</h3>
              <img src={e.product.image} className={style.tamanoimg} alt="img product" />
              <h3 className={style.price}>{e.product.price}</h3>
              <h3>{e.product.stock}</h3>
              <h3> {e.quantity}</h3>
              <h3> {e.product.quality}</h3>
              <h3> {e.product.score}</h3>

              <h5>{e.product.price * e.quantity}</h5>
              <button onClick={async () => {

                console.log("productos: ", e.product)
                //   await clearFromCart(e.product)

                await deleteItemToCart(e.product)

              }}> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="currentColor" class="bi bi-cart-x" viewBox="0 0 16 16">
                  <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg> </button>
            </div>

          )

        }

        )


        :
        <div><h1>No hay nada en el carrito</h1></div>
      }
      <div>
        <h3>Total to pay ${total}</h3>
        {Object.keys(pay).length ? <a className={style.button} target="_blank" rel="noopener" href={pay.init_point + ""}>GO PAY</a>
          :
          userId ?
            <button className={style.button} onClick={(e) => {
              e.preventDefault()
              if (cart.length) {
                dispatch(getPaymentLink(0, userId))
              }
            }}>BUY NOW</button>
            : <h3>Inicia sesión para comprar</h3>
            }
        <button><Link to='/'>Home</Link></button>

      </div>
    </div>

  )


};