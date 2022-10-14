import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Paginado/Paginado.jsx";


import {
  searchProducts,
  getProducts,
  sortLower,
  orderByScore,
  sortHigh,
} from "../../redux/actions";



function Productos() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);


  // Lógica para mostrar 9 recetas por página
  const [page, setPage] = useState(1);
  const productsPage = 9;
  const numberOfProducts = page * productsPage;
  const firstProducts = numberOfProducts - productsPage;
  const showProducts = products.slice(firstProducts, numberOfProducts);

  const paged = function (pageNumber) {
      setPage(pageNumber)
  };


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


  //-----sort
  function handleSort(e){ 
    e.preventDefault()
    

  }
//----score
  function handleScore(score){
    score.preventDefault()
  }


  return (
    <div>
      
      <div>
    <label >Sort</label>
    <select  onChange={e=>handleSort(e)}>
    <option  hidden value=''>⇅</option>
    <option  value='lower'>-</option> 
    <option  value='high'>+</option>
    </select>
    </div>

     
      <div>
      <label >Score</label>
      <select  onChange={score=>handleScore(score)}>
      <option  hidden value=''>⇅</option>
      <option  value='bottom'>-</option> 
      <option  value='top'>+</option>
      </select>
      </div>
 {/* <button onClick={() => dispatch(orderByScore("high"))}>
        ORD MAYORES
      </button>
      <button onClick={() => dispatch(orderByScore("lower"))}>
        ORD MAYORES
      </button> */}

      {/* <input
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
      </button> */}
      <button className="Reset" onClick={homeHandler}>
        RESET
      </button>
      {/* <div className="ControlPag">
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
       */}  
       
       
       <div>
          {products.length === 0 && <h1>NO HAY PRODUCTOS</h1>}
          {showProducts.map((e) => {
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
        <div >

        <div>
                {
                   products.length > 9 ?
                        <div >
                            <Nav productsPage={productsPage} showedProducts={products.length} paged={paged} setPage={setPage} page={page}></Nav>
                            <span > {page} of {Math.ceil(products.length / productsPage)} </span>
                        </div> :
                        <div><span > {page} of {Math.ceil(products.length / productsPage)} </span></div>
                }

            </div>


</div>
      </div>
    
  );
  
}
export default Productos;