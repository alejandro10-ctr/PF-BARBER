// import React from 'react';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import { getPaymentLink } from '../../redux/actions';


// export default function MercadoPago() {
//     const dispatch = useDispatch()


//     useEffect(() => {
//         dispatch(getPaymentLink())

//     }, [dispatch])


//     const pay = useSelector((state) => state.payMercadoPago)


//     console.log(pay)

//     // const url = pay.init_point
//     // const slice = url.slice(31, url.length)

//     return (
//         <div>
//             <a target="_blank" rel="noopener" href={pay.init_point}> Mercado Pago</a>









//         </div>
//     )
// }