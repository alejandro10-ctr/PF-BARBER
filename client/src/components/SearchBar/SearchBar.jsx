import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, searchProducts } from '../../redux/actions';
//import {Link} from 'react-router-dom';
//import { getProducts } from '.././redux/actions'; // => hay un error aca!!!!


export default function SearchBar() {

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
        dispatch(searchProducts(name)); 
        setName('')
       
    }
    return (
        <div >
            <input
                value={name}
                id="input"
                type="search"
                placeholder="Search a product..."
                // autoComplete="off"             
                onChange={(e) => handleInputChange(e)}
                // onKeyPress={(input) => handleSearch(input)}
            />
            <button type='text' onClick={(submit) => { handleInputSubmit(submit) }}>🔍</button>


        </div>
    )
}





