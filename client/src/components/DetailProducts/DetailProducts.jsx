import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail, addToCart, getPaymentLink } from "../../redux/actions";


// import styles from '../DetailProducts/DetailProducts.module.css';

function DetailProduct({ match }) {

  const dispatch = useDispatch();
  const id = match.params.id;

  const detailOfProducts = useSelector((state) => state.detail)
  console.log(detailOfProducts)

  const product = useSelector((state) => state.detail)
  const cart = useSelector((state) => state.cart)

  // useEffect(() => {
  //   dispatch(getProductsDetail(id));
  // }, [id]);


  //const filter = allProducts.filter(f => f.description)
  // console.log(filter)

  useEffect(() => {
    dispatch(getProductsDetail(id))// accedo al id del detalle
  }, [dispatch]) // muestra recien cuando el componente se monta

  // if (!detailOfProducts) return null;
  useEffect(() => {
    if (Object.keys(product).length) {
      dispatch(addToCart(product))
    }
    
  }, [product])
  useEffect(() => {
    let inCar = cart.find((e) => e.productId === Math.round(id))
    console.log('incar', inCar)
    if (inCar) {
      dispatch(getPaymentLink(id))
    }
  }, [cart])

  const pay = useSelector((state) => state.payMercadoPago)
  return (
    <div>
      {/* <Link to="/">Back</Link> */}

      {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}
      {console.log("pay", pay.init_point)}
      <a target="_blank" rel="noopener" href={pay.init_point + ""} onClick={() => {
      }}>  Mercado Pago</a>

      <hr />
      <Link to="/shop"> See more products! </Link>


      {/* Card */}
      <div>
        <h3>{detailOfProducts.name}</h3>
        <img src={detailOfProducts.image} alt={detailOfProducts.image} />
        <h3>Price: ${detailOfProducts.price}</h3>
        <h3>{detailOfProducts.quality}</h3>


      </div>


    </div>
  );
}
export default DetailProduct;
