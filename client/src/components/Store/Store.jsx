import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  searchProducts,
  getProducts,
  sortByPrice,
  orderByScore,
} from "../../redux/actions";

function Productos() {
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const [busqueda, setBusqueda] = useState("");

  const inputHandler = (e) => {
    setBusqueda(e.target.value);
  };
  const onClickHandler = () => {
    dispatch(searchProducts(busqueda));
  };
  const homeHandler = () => {
    dispatch(getProducts());
  };
  useEffect(() => {
   
    dispatch(getProducts());
    console.log("hola")
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(sortByPrice("lower"))}>
        Menor Precio
      </button>
      <button onClick={() => dispatch(sortByPrice("hight"))}>
        Mayor Precio
      </button>
      <button onClick={() => dispatch(orderByScore("high"))}>
        ORD MAYORES
      </button>
      <button onClick={() => dispatch(orderByScore("lower"))}>
        ORD MAYORES
      </button>
      <input
        type="text"
        placeholder="Search by Name"
        className="InputSearch"
        name="input"
        autoComplete="off"
        onChange={inputHandler}
        value={busqueda}
      />
      <button className="Search" onClick={onClickHandler}>
        SEARCH
      </button>
      <button className="Reset" onClick={homeHandler}>
        RESET
      </button>
      <div className="ControlPag">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          {" "}
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={products?.slice((page + 1) * 8).length === 0}
        >
          {" "}
          Siguiente
        </button>
        <div>
          {products.length === 0 && <h1>NO HAY PRODUCTOS</h1>}
          {products.slice(page * 8, (page + 1) * 8).map((e) => {
            return (
              <div key={e.id}>
                <img src={e.imageProfile} alt="Imagen de Producto"></img>
                <h2>{e.name}</h2>
                <h3>{e.price}</h3>
                <h3>{e.stock}</h3>
                <button onClick={console.log("comprar")}>COMPRAR</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
}
export default Productos;