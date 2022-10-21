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
    }, [cartItems]);


    const addItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.product.id === detailProduct.id
        );


        let isShowDialog = false
        if (inCart) {
            if (inCart.quantity + 1 <= inCart.product.stock) {
                inCart.quantity++
                setCartItems([...cartItems])
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


    const subtractItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );

        if (inCart.quantity > 1) {
            inCart.quantity--
            setCartItems([...cartItems])
        }
        if (inCart.quantity - 1 === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can buy from 1"
            })
        }
    };
    const deleteItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );
        cartItems.splice(cartItems.indexOf(inCart),1)
        setCartItems([...cartItems]);

        if (inCart.quantity - 1 === 0) {
            Swal.fire({
                icon: "error",
                title: "Successfully deleted",
                text: `Product ${inCart.product.name} delete from cart`
            })
        }
    }


    /* if(localStorage.getItem(el => JSON.stringify(el.quantity) === "0") ){
        localStorage.removeItem()
      } */


    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, subtractItemToCart, deleteItemToCart }}>
            {children}
        </CartContext.Provider>
    )



};


