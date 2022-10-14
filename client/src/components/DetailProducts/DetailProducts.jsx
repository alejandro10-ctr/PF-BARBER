import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState();
  useEffect(() => {
    if (id)
      fetch("http://localhost:3001/products/" + id)
        .then((res) => res.json())
        .then((res) => setProducts(res));
  }, [id, setProducts]);
  if (!products) return null;
  return (
    <div>
      <Link to="/" className="Home">Back</Link>
       
     
      <h3>{products.name}</h3>
      <img src={products.imageProfile} alt={products.imageProfile} />
      <div>
        <h3>{products.price}</h3>
      </div>
      <div>
        <h3>{products.score}</h3>
      </div>
      <div>
        <div>{products.description}</div>
      </div>
      <div>{products.stock}</div>
      <div>{products.description}</div>
    </div>
  );
}
export default Product;
