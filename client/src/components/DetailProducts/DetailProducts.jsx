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

  function updateProductInCar() { return cart.find((productInCar) => productInCar.productId = Math.round(id)) }
  const [productInCar, setProducInCar] = useState(updateProductInCar())
  // useEffect(() => {
  //   dispatch(getProductsDetail(id));
  // }, [id]);


  //const filter = allProducts.filter(f => f.description)
  // console.log(filter)


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


  // const user = useSelector((state) => state.user)


  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getDBUser(userId))
  //   }
  // }, []);




  return (
    <div>
      {/* <HomeNavBar user={user} /> */}
      {/* <Link to="/">Back</Link> */}
      {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}

      <hr />
      <Link to="/shop"> See more products! </Link>


      {/* Card */}
      <div>
        <button onClick={async (e) => {
          e.preventDefault()
          await deleteItemToCart(product)
        }}> X🛒 </button>
        <h3>{product.name}</h3>
        <img src={product.image} alt={product.image} />
        <h3>Price: ${product.price}</h3>
        <h3>{product.quality}</h3>
        {console.log("productInCart", productInCar)}
        <div>

          {productInCar ? <h3>Quantity {productInCar.quantity}</h3> : null}
        </div>

        {Object.keys(pay).length ? <a className={s.button} target="_blank" rel="noopener" href={pay.init_point + ""}>GO PAY</a>
          :
          userId ?
            <button className={s.button} onClick={(e) => {
              e.preventDefault()
              if (cart.length) {
                // const productInCar = cart.find((productInCar) => productInCar.productId === id)
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
