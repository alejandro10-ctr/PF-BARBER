import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail, getLocalStorage, getDBCart, updateDBCart, getPaymentLink, } from "../../redux/actions";
import { CartContext } from "../Shopping/ShoppingCart";

import s from './DetailProducts.module.css'


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

  // useEffect(() => {
  //   dispatch(getProductsDetail(id));
  // }, [id]);


  //const filter = allProducts.filter(f => f.description)
  // console.log(filter)


  // if (!detailOfProducts) return null;
  useEffect(() => {
    if (update) {
      // pay = {}
      dispatch(getProductsDetail(id))// accedo al id del detalle

      if (userId) {
        dispatch(getDBCart(userId))
      }
      setUpdate(false)
    }
  }, [update]) // muestra recien cuando el componente se monta

  useEffect(() => {

    if (cart.length) {
      let inCar = cart.find((e) => e.productId === Math.round(id))

      if (inCar && goPay) {
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




  return (
    <div>
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
        {cart.length ? cart.map((productInCar) => {
          if (productInCar.productId === id) {
            return <div>
            <button onClick={async (e) => {
              e.preventDefault()
              await addItemToCart(product)
            }}> +🛒 </button>
            <button onClick={async (e) => {
              e.preventDefault()
              await subtractItemToCart(product)
            }}> -🛒 </button>
            
              <h3>Quantity {productInCar.quantity}</h3>
            </div>
          }
        }) : null
        }

        {Object.keys(pay).length ? <a className={s.button} target="_blank" rel="noopener" href={pay.init_point + ""}>GO PAY</a>
          :
          userId ?
            <button className={s.button} onClick={(e) => {
              e.preventDefault()
              if (cart.length) {
                const productInCar = cart.find((productInCar) => productInCar.productId === id)
                if (Object.keys(product).length) {
                  if (!productInCar?.quantity) Swal.showLoading()
                  setGoPay(true)
                  addItemToCart(product, productInCar?.quantity)
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
