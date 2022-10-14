import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Paginado from "../Paginado/Paginado.jsx";
import {
  getProducts,
  sortLower,
  scoreHigh,
  scoreLower,
  sortHigh,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";

export default function Productos() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  //logic pagination
  const [page, setPage] = useState(1);
  const productsPage = 9;
  const numberOfProducts = page * productsPage;
  const firstProducts = numberOfProducts - productsPage;
  const showProducts = products.slice(firstProducts, numberOfProducts);

  const paged = function (pageNumber) {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProducts());
    console.log("hola");
  }, [dispatch]);

  //-----sort
  function handleSort(sort) {
    sort.preventDefault();
    if (sort.target.value === "lower") dispatch(sortLower(sort.target.value));
    else if (sort.target.value === "high")
      dispatch(sortHigh(sort.target.value));
  }

  //----score
  function handleScore(score) {
    score.preventDefault();
    if (score.target.value === "lower") dispatch(scoreLower(score.target.value));
    else if (score.target.value === "high")
      dispatch(scoreHigh(score.target.value));
  }
  //---reset
  function handleReset() {
    window.location.reload();
  }

  return (
    <div>
      {/* searchbar */}
      <SearchBar />

      {/* sort */}
      <div>
        <label>Sort</label>
        <select onChange={(e) => handleSort(e)}>
          <option hidden value="">
            ⇅
          </option>
          <option value="lower">-</option>
          <option value="high">+</option>
        </select>
      </div>

      {/* score */}
      <div>
        <label>Score</label>
        <select onChange={(score) => handleScore(score)}>
          <option hidden value="">
            ⇅
          </option>
          <option value="lower">-</option>
          <option value="high">+</option>
        </select>
      </div>

      <button onClick={handleReset}> RESET </button>

      <div>
        {products.length === 0 && <h1>We dont Have that product!</h1>}
        {showProducts.map((e) => {
          return (
            <div key={e.id}>
              <img src={e.imageProfile} alt="img"></img>
              <h2>{e.name}</h2>
              <h3>Price: ${e.price}</h3>
              <h3>Stock: {e.stock}</h3>
              <h3>Score: {e.score}</h3>
              {/* <button onClick={console.log("comprar")}>COMPRAR</button> */}
              <Link to={`/product/${e.id}`}>Detail Product</Link>
            </div>
          );
        })}
      </div>
      <div>
        <div>
          {
            <Paginado
              productsPage={productsPage}
              showedProducts={products.length}
              paged={paged}
              setPage={setPage}
              page={page}
            ></Paginado>
          }
          {/* {products.length > 9 ?
                     
                            <Paginado productsPage={productsPage} showedProducts={products.length}
                            paged={paged} setPage={setPage} page={page}>
                            </Paginado>
                            <span > {page} of {Math.ceil(products.length / productsPage)} </span>
                        :
                        <div><span > {page} of {Math.ceil(products.length / productsPage)} </span></div>
                    } */}
        </div>
      </div>
    </div>
  );
}
