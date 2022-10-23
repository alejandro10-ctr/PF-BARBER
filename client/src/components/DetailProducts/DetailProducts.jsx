import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail, addToCart, getPaymentLink  } from "../../redux/actions";


// import styles from '../DetailProducts/DetailProducts.module.css';

function DetailProduct({ match }) {

  const dispatch = useDispatch();
  const id = match.params.id;
  console.log('SOY ID',id)

  const detailOfProducts = useSelector((state) => state.detail)
  console.log(detailOfProducts)

  const allProducts = useSelector((state) => state.products)

  console.log(allProducts)
  // useEffect(() => {
  //   dispatch(getProductsDetail(id));
  // }, [id]);

  console.log(id) //entra 

  //const filter = allProducts.filter(f => f.description)
 // console.log(filter)

  useEffect(() => {
    dispatch(getProductsDetail(id))// accedo al id del detalle
  }, [dispatch]) // muestra recien cuando el componente se monta

  // if (!detailOfProducts) return null;
  useEffect(() => {
    dispatch(getPaymentLink())

}, [dispatch])


const pay = useSelector((state) => state.payMercadoPago)
  return (
    <div>
      {/* <Link to="/">Back</Link> */}

      {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}

      {/* <></ target="_blank" rel="noopener" href={pay.init_point} onClick={()=> addToCart(id)> Mercado Pago</a> */}
      <a target="_blank" rel="noopener" href={pay.init_point} onClick={()=> addToCart(id)}>  Mercado Pago</a>

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
