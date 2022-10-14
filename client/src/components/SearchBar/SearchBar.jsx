import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, searchProducts } from "../../store/actions";

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

export default function SearchBar({}) {
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
