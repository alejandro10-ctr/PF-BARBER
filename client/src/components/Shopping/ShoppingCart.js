import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './ShoppingCart.css'



export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(()=> {
        try {
            const productosenLocalStorage = localStorage.getItem("prducts");
            return productosenLocalStorage ? JSON.parse(productosenLocalStorage) : [];
        }catch(error){
            return []
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
        console.log(cartItems)
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
    }

    
       const deleteItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === product.id
        ); 
       
        if(product.quantity === 1) {   // inCart.quantity
            setCartItems(
                cartItems.filter((productsInCart) => productsInCart.id !== product.id)
            );
        } else {
            setCartItems(
               cartItems.map((productsInCart) => {
                if(productsInCart.id === product.id) {
                    return { ...inCart, quantity: inCart.quantity > 0 ? inCart.quantity - 1 :  (inCart.quantity= 0) && Swal.fire({
                        title: "Sorry...",
                        text: "You can't buy less than 0",
                        icon: "warning",
                        button: "Accept"
                    }) };
                } else return productsInCart;
            }));
        }
  
    };
    
    
    return (
        <CartContext.Provider value= {{cartItems, addItemToCart, deleteItemToCart}}>
            {children}
        </CartContext.Provider>
    )



    };






