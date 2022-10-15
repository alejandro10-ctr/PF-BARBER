import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail } from "../../redux/actions";

function DetailProduct({ match }) {
  const dispatch = useDispatch();
  const id = match.params.id;
  console.log(id)
  const detail = useSelector((state) => state.detail)
  useEffect(() => {
    dispatch(getProductsDetail(id));
  }, [id]);
  if (!detail) return null;
  return (
    <div>
      <Link to="/">Back</Link>
      <Link to="/MercadoPago">PAGA CON MERCADO DE PAGO</Link>
      <h3>{detail.name}</h3>
      <img src={detail.image} alt={detail.image} />
      <div>
        <h3>{detail.price}</h3>
      </div>
      <div>
        <div>{detail.description}</div>
      </div>
      <div>{detail.stock}</div>
    </div>
  );
}
export default DetailProduct;
