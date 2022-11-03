import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import {useSelector } from "react-redux";
import { Link } from "react-router-dom";




export default function Carrusel () {

  
  let productos = useSelector((state)=> state.allProducts)


    return (
      <Carousel  itemsToShow={3} enableAutoPlay={true} autoPlaySpeed={4000} disableArrowsOnEnd={false}>
        {productos.map(item => <div> <div><h2>{item.name}</h2></div> <a href={`/product/${item.id}`}><img src={item.image} alt={item.title} width="200" height="200"/></a> </div>)}
      </Carousel>
    )
  }