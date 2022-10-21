import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getPaymentLink } from '../../redux/actions';


export default function MercadoPago(){
const dispatch = useDispatch()


    useEffect(()=>{  
         dispatch(getPaymentLink())
       
    },[dispatch]) 


const pay = useSelector((state)=> state.payMercadoPago)


console.log(pay.init_point)

// const url = pay.init_point
// const slice = url.slice(31, url.length)

    return(
        <div>

<button><Link target="_blank" to={pay.init_point}>Mercado Pago</Link></button>
           
        </div>
    )
}