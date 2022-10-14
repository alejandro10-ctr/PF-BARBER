import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getProducts } from '../../redux/actions';
//import {Link} from 'react-router-dom';
//import { getProducts } from '.././redux/actions'; // => hay un error aca!!!!


export default function SearchBar( {setPage} ){  

    const dispatch = useDispatch()

    //creo estado local: 
    const [input, setInput] = useState('')
    const [search, setSearch] = useState(false)

    function handleInputChange(e){ // setea el estaedo
        e.preventDefault();
        setInput(e.target.value)    
      }
      
    function handleSearch(search){
        search.preventDefault();
        setInput(search.target.value);
        if(search.charCode === 13){
        dispatch (getProducts(search.target.value))//query
        console.log(search.target.value)
    
        }}
      
    function handleInputSubmit(submit){
        submit.preventDefault();
        setPage(1)
        if(input){
        dispatch(getProducts(input));
        setSearch(true)
        document.getElementById("input").value="";
        }else{
              setSearch(true)
              return alert("Search a product")
        }
    }



    return (  
        <div >
        <input 
       /*  value={input} */
        id = "input"
        type="search" 
        placeholder='Search a product' 
        autoComplete='off'             
        onChange={(e)=>handleInputChange(e)}
        //onKeyPress={(search)=>handleSearch(search)}             
        />
        <button type='text' onClick={(submit) =>{handleInputSubmit(submit)}}>🔍</button>


        </div>
)}






/* import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, searchProducts } from "../../store/actions";
 */
{
  /*export default function SearchBar({}) {
  const dispatch = useDispatch();
  const [nameProd, setProd] = useState("");

  const handleInputChange = (e) => {
    setProd(e.target.value);
  };

  const onclickHandler = () => {
    dispatch(searchProducts(nameProd));
    console.log(nameProd);
  };
  const homeHandler = () => {
    dispatch(getProducts());
  };

  return (
    <div>
      <input
        placeholder="Search by Name"
        className="InputSearch"
        name="input"
        autoComplete="off"
        onChange={handleInputChange}
        value={nameProd}
      />
      <button className="Search" onClick={onclickHandler}>
        SEARCH
      </button>
      <button className="Reset" onClick={homeHandler}>
        RESET
      </button>
    </div>
  );
  */
}

/* export default function SearchBar({}) {
  const dispatch = useDispatch();

  //creo estado local:
  const [nameProd, setProd] = useState("");

  function handleInputChange(e) {
    // setea el estaedo
    e.preventDefault();
    setProd(e.target.value);
  }

  function handleSearch(search) {
    if (search.charCode === 13) {
      search.preventDefault();
      dispatch(getProducts()); //query
      setProd(search.target.value);
    }
  }

  function handleInputSubmit(submit) {
    submit.preventDefault();
    dispatch(searchProducts(nameProd));
  }

  return (
    <div>
      <input
        value={nameProd}
        type="search"
        placeholder="Search a product"
        onChange={(e) => handleInputChange(e)}
        onKeyPress={(search) => handleSearch(search)}
      />
      <button type="text" onClick={(submit) => handleInputSubmit(submit)}>
        🔍
      </button>
    </div>
  );
}
 */