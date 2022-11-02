import React, {useContext} from "react";
import { CartContext } from "./ShoppingCart";

const ItemCart = ({item}) => {
    const { deleteItemToCart, addItemToCart } = useContext(CartContext)
    const { id } = item  
 
    return (
        <div>
            <img src = {item.image} alt={item.image}/>
            <div>
               <div>
                <p>{item.name}</p>
                <div>
                    <button onClick={() => addItemToCart(item) } >Add</button>
                    <button onClick={() => deleteItemToCart(item)} ></button>
                </div>
               </div>
               <div>
                {item.quantity}
                <p>Total: ${item.quantity * item.price} </p>
               </div>
            </div>
        </div>
    )
}





//import React, {useState} from "react";
//import { useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
//import { addToCart, delFromCart } from "../../redux/actions";
//import Swal from "sweetalert2"
//import { useAuth0 } from "@auth0/auth0-react";
//import { useAuth } from "react-use-auth";


//export default function ProductItem ({id, stock}) {
/*     const {id,
        quantity,
        iva,
        description,
        state,
        descriptionState,
        productId,
        saleId,} = props; */

    //console.log(localStorage)

    //const prodId = id
   // console.log(prodId)
    //const prods = useSelector((state) => state.products)
    //const cart = useSelector((state) => state.cart)
    //console.log(cart)
    //const quantity = cart.quantity
    //console.log(quantity)
    //const [cantidad, setCantidad] = useState(quantity)


    //const detailProd = prods.filter(el => el.id ===  parseInt(prodId))[0]
   // console.log(detailProd)

  //  const logged = useAuth0()


    /* function addToLocalStorage(product){
        let productos = getProductsLs();
        productos.push(product);
        localStorage.setItem('products',  JSON.stringify(productos))  // => 'products' o 'productos' ?
    }; */
    
    //function handleBuy(){
    //    if(logged){
       /*  localStorage.removeItem(JSON.stringify(detailProd))
        setCantidad(stock - quantity) */
      /*   }else{
            Swal({
                title: "Watch out!!",
                text: "You must be logged to buy a product",
                icon: "error",
                button: "Accept"   
             });
        } */
    //}
    

/* * * * * * * * PARA AGREGAR A FAVORITOS * * * * * * * * *  
    function handleAddToFav(){
        if(logged){
        cart.push(detailProd)
       localStorage.setItem(detailProd.id ,JSON.stringify(detailProd))
       }else{
         Swal({
            title: "Watch out!",
            text: "You must be logged to add a product",
            icon: "error",
            button: "Accept"   
         });
       }
    }; */
/* 
    function handleChange(e){
      e.preventDefault();
      console.log(e.target.value) 
         setCantidad(()=> { */
        /* if(e.target.value === 0)
         { */  /*  return {
            ...cantidad,
            [e.target.quantity] : e.target.value
        
        
        } */
    /* }else{
            Swal.fire({
                title: "Sorry...",
                text: "You can't get 0 items",
                icon: "warning",
                button: "Accept"
            });
        } */
      /*    })

    function handleUp(){
        setCantidad(cantidad + 1);
        addToCart(); 
        cart.quantity = cantidad + 1;
        localStorage.setItem(detailProd.id ,JSON.stringify(detailProd))
    };


    function handleDown(){
        if(cantidad > 1){
        setCantidad(cantidad - 1);
        delFromCart();
        cart.quantity = cantidad - 1;
        
        localStorage.removeItem(detailProd.id ,JSON.stringify(detailProd))
        }    
    }; */

  /* * * * * * * * NO LEE LA PROPIEDAD STOCK * * * * * * * * * * * * * * * * * 
    if(detailProd.stock < cantidad){
        Swal.fire({
            title: "Sorry...",
            text: "There's not that quantity available on stock",
            icon: "warning",
            button: "Accept"
        });
    } */
/* 
}

    return(
        <div>
            <input
                className="input"
                type="number"
                value={cart.name}
                name="addToCart"
                onChange={e => handleChange (e)}
                />
        
        </div>
    )
}  */


