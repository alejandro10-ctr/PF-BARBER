import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import './ShoppingCart.css'



export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const productosenLocalStorage = localStorage.getItem("products");
            return productosenLocalStorage ? JSON.parse(productosenLocalStorage) : [];
        } catch (error) {
            return []
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
        console.log("cartItems", cartItems)
    }, [cartItems]);


    const addItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.product.id === detailProduct.id
        );
        console.log(inCart) 


        let isShowDialog = false
        if (inCart) {
            if(inCart.quantity+1 <=  inCart.product.stock){
                setCartItems(
                    cartItems.map((productInCart) => {
                        if (productInCart.product.id === detailProduct.id) {
                            return { ...inCart, quantity: inCart.quantity + 1 }
                        } else return productInCart;
                    })
                );
                return
            }
            isShowDialog = true
        } else {

            if (1 <= detailProduct.stock) {
                setCartItems([...cartItems, {
                    id: cartItems.length + 1,
                    quantity: 1,
                    iva: 0,
                    description: "",
                    state: 2,
                    descriptionState: "",
                    productId: detailProduct.id,
                    saleId: null,
                    userId: null,
                    product: detailProduct
                }
                ])
                return
            }
            isShowDialog = true
        }
        if (isShowDialog) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Not in stock"

            })
        } 


    }


    const deleteItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.id === detailProduct.id
        );
        
        
        if (inCart && inCart?.quantity === 1) {   // inCart.quantity
            setCartItems(
                cartItems.filter((productsInCart) => productsInCart.id !== detailProduct.id)
                );
            } else {
                setCartItems(
                    cartItems.map((productsInCart) => {
                        if (productsInCart.id === detailProduct.id) {
                            return { ...inCart, quantity: inCart.quantity > 0 ? inCart.quantity - 1 : inCart.quantity = 0 };
                        } else return productsInCart;
                    }));
                }
                
                console.log(inCart)
        
        

        if (inCart && inCart.quantity === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Not negative numbers please"
            })
        }

        if (cartItems.length === 0) {
            localStorage.clear()
        }

    };



    console.log("localStorage:" ,localStorage)




    console.log("cart:", cartItems)



    /* if(localStorage.getItem(el => JSON.stringify(el.quantity) === "0") ){
        localStorage.removeItem()
      } */


    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, deleteItemToCart }}>
            {children}
        </CartContext.Provider>
    )



};


