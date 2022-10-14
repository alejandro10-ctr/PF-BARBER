import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Paginado from '../Paginado/Paginado.jsx';
import { getProducts, sortLower, orderByScore, sortHigh } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";


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
        setPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getProducts());
        console.log("hola")
    }, [dispatch]);


    //-----sort
    function handleSort(sort) {
        sort.preventDefault();
        if (sort.target.value === "lower") dispatch(sortLower(e.target.value));
        else if (e.target.value === "high") dispatch(sortHigh(e.target.value));
    }

    //----score--
    function handleScore(score) {
        score.preventDefault()
        dispatch(orderByScore(score.target.value))
    }


    return (
        <div>
            {/* searchbar */}
            <SearchBar />

            {/* sort */}
            <div>
                <label >Sort</label>
                <select onChange={e => handleSort(e)}>
                    <option hidden value=''>⇅</option>
                    <option value='lower'>-</option>
                    <option value='high'>+</option>
                </select>
            </div>

            {/* score */}
            <div>
                <label >Score</label>
                <select onChange={score => handleScore(score)}>
                    <option hidden value=''>⇅</option>
                    <option value='bottom'>-</option>
                    <option value='top'>+</option>
                </select>
            </div>

            <button> RESET  </button>

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
                    {products.length > 9 ?
                        <div><Paginado productsPage={productsPage} showedProducts={products.length}
                            paged={paged} setPage={setPage} page={page}></Paginado>
                            <span > {page} of {Math.ceil(products.length / productsPage)} </span>
                        </div> :
                        <div><span > {page} of {Math.ceil(products.length / productsPage)} </span></div>
                    }

                </div>
            </div>
        </div>

    );

}