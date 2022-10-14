import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { getProducts } from '../../store/actions';


export default function SearchBar({}){  

    const dispatch = useDispatch()

    //creo estado local: 
    const [nameProd, setProd] = useState('')

 

    function handleInputChange(e){ // setea el estaedo
        e.preventDefault();
        setProd(e.target.value)    
      }
      
    function handleSearch(search){
        if(search.charCode === 13){
            search.preventDefault();
        dispatch (getProducts(search.target.value))//query
            setProd(search.target.value)
    
        }}
      
    function handleInputSubmit(submit){
        submit.preventDefault();
        dispatch(getProducts(nameProd));
        }

    return (  
        <div >
        <input 
        value={nameProd}
        type="search" 
        placeholder='Search a product'              
        onChange={(e)=>handleInputChange(e)}
        onKeyPress={(search)=>handleSearch(search)}             
        />
        <button type='text' onClick={(submit) =>handleInputSubmit(submit)}>🔍</button>


        </div>
)}


