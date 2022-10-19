//import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { delFromCart, addToCart/* , getProducts */ } from "../../redux/actions";

const CartItem = ({data}) => {
    let {id, name, price, image, quantity} = data
    console.log(id)
    const idMotherFucker = useParams().id
    console.log(idMotherFucker)
     const prod = useSelector((state) => state.products)
    console.log(prod) 
    //const dispatch = useDispatch()

    /* useEffect((idMotherFucker)=>{
      dispatch(getProducts(idMotherFucker))
    },[dispatch]) */

     const detailProd = prod.filter(el => el.id ===  parseInt(idMotherFucker))[0]
     console.log(detailProd)


 return (
    <div style={{borderBottom:"thin solid gray"}}>
        
        <img src={detailProd.image} alt=""/>
        <h4>{detailProd.name}</h4>
        <h5>${detailProd.price} {/* x  {detailProd.quantity} */} = ${detailProd.price/* *detailProd.quantity */}</h5>
        <button onClick={()=> addToCart(id)}>Add</button>
        <br>
        </br>
        <button onClick={()=> delFromCart(id)}>Delete One</button>
        <br>
        </br>
        <button onClick={()=> delFromCart(id, true)}>Delete All</button>
        <br>
        </br>
        <br>
        </br>
    </div>
 );    
};

export default CartItem;