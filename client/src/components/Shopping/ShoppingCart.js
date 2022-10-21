import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './ShoppingCart.css'



export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(()=> {
        try {
            const productosenLocalStorage = localStorage.getItem("products");
            return productosenLocalStorage ? JSON.parse(productosenLocalStorage) : [];
        }catch(error){
            return []
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
        //console.log(cartItems)
    }, [cartItems]);


    const addItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === product.id
        );

        if(inCart){
            setCartItems(
                cartItems.map((productInCart) => {
                    if(productInCart.id === product.id) {
                        return { ...inCart, quantity: inCart.quantity + 1 }
                    }else return productInCart;
                })
            );
        }else {
            setCartItems([...cartItems, {...product, quantity: 1}])
        }


        if(cartItems && cartItems[0].stock <= cartItems[0].quantity){
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Not in stock"
                 
            })
        }


    }

    
       const deleteItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === product.id
        ); 
        //console.log(inCart)
       
        if(inCart && inCart?.quantity === 1) {   // inCart.quantity
            setCartItems(
                cartItems.filter((productsInCart) => productsInCart.id !== product.id)
            );
        } else {
            setCartItems(
               cartItems.map((productsInCart) => {
                if(productsInCart.id === product.id) {
                    return { ...inCart, quantity: inCart.quantity > 0 ? inCart.quantity - 1 :  (inCart.quantity= 0)  };
                } else return productsInCart;
            }));
        }
  
        if( cartItems.length === 0){
            localStorage.clear()
        }

        if(inCart && inCart.quantity === 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Not negative numbers please"
            })
        }

    };
    


    //console.log( localStorage  )




    //console.log("cart:",cartItems)



    /* if(localStorage.getItem(el => JSON.stringify(el.quantity) === "0") ){
        localStorage.removeItem()
      } */
    
    
    return (
        <CartContext.Provider value= {{cartItems, addItemToCart, deleteItemToCart}}>
            {children}
        </CartContext.Provider>
    )



    };






