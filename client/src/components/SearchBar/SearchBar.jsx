import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/actions';
//import {Link} from 'react-router-dom';
//import { getProducts } from '.././redux/actions'; // => hay un error aca!!!!
import styles from './SearchBar.module.css';
import Swal from "sweetalert2";

export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch()

    //creo estado local: 
    const [name, setName] = useState('')
    // const [search, setSearch] = useState(false)

    function handleInputChange(e) { // setea el estaedo
        e.preventDefault();
        setName(e.target.value)
        console.log(e.target.value)

    }


    function handleInputSubmit(submit){
        submit.preventDefault();
        if(name) {
            dispatch(searchProducts(name)); 
            setName('')
        setCurrentPage(1)
        } else {
            Swal.fire({
                icon: 'error',
                title: "Error...",
                text: "Please search a product",
                
            })
            //return alert("Please search a product")
        }
}
    return (
        <div >
            <input 
                className={styles.search} 
                value={name}
                id="input"
                type="search"
                placeholder="Search a product..."
                // autoComplete="off"             
                onChange={(e) => handleInputChange(e)}
                // onKeyPress={(input) => handleSearch(input)}
            />
            <button type='text' onClick={(submit) => { handleInputSubmit(submit) }}  className={styles.buttonStyle}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>


        </div>
    )
}