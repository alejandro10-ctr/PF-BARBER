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
