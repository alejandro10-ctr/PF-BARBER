import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsDetail } from "../../redux/actions";

function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detail, setDetail] = useState();
  useEffect(() => {
    dispatch(getProductsDetail(id));
  }, [id]);
  if (!detail) return null;
  return (
    <div>
      <Link to="/">Back</Link>
      <Link to="/MercadoPago">PAGA CON MERCADO DE PAGO</Link>
      <h3>{detail.name}</h3>
      <img src={detail.imageProfile} alt={detail.imageProfile} />
      <div>
        <h3>{detail.price}</h3>
      </div>
      <div>
        <h3>{detail.score}</h3>
      </div>
      <div>
        <div>{detail.description}</div>
      </div>
      <div>{detail.stock}</div>
    </div>
  );
}
export default Product;
