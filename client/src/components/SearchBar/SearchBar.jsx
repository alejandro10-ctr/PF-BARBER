import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getProducts } from '../../redux/actions';
//import {Link} from 'react-router-dom';
//import { getProducts } from '.././redux/actions'; // => hay un error aca!!!!


export default function SearchBar( /* {setPage} */ ){  

    const dispatch = useDispatch()

    //creo estado local: 
    const [input, setInput] = useState('')
    const [search, setSearch] = useState(false)

    function handleInputChange(e){ // setea el estaedo
        e.preventDefault();
        setInput(e.target.value)   
        console.log(e.target.value) 
      }
      
    /* function handleSearch(search){
        search.preventDefault();
        setInput(search.target.value);
        console.log(search.target.value)
        if(search.charCode === 13){
        dispatch (getProducts(search.target.value))//query
    
        }} */
      
    function handleInputSubmit(submit){
        submit.preventDefault();
        //setPage(1)
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
       // onKeyPress={(search)=>handleSearch(search)}             
        />
        <button type='text' onClick={(submit) =>{handleInputSubmit(submit)}}>🔍</button>


        </div>
)}





