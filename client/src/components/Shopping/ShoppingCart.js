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


    const addItemToCart = async (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.product.id === detailProduct.id
        );


        let isShowDialog = { show: false, icon: "warning", title: "Oops...", text: "Not in stock" }
        if (inCart) {
            if (inCart.quantity + 1 <= inCart.product.stock) {
                inCart.quantity++
                setCartItems([...cartItems])
            } else {
                isShowDialog.show = true
            }
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
                isShowDialog.show = true
                isShowDialog.icon = "success"
                isShowDialog.title = "Successfully added"
                isShowDialog.text = `Product ${detailProduct.name} added from cart`
            } else {
                isShowDialog.show = true
            }
        }
        if (isShowDialog.show) {
            delete isShowDialog.show
            await Swal.fire(isShowDialog)
        }


    }


    const subtractItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );
        if (inCart) {
            if (inCart.quantity > 1) {
                inCart.quantity--
                setCartItems([...cartItems])
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You can buy from 1"
                })
            }
        }
    };
    const deleteItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );
        const index = cartItems.indexOf(inCart)
        if (inCart) {
            cartItems.splice(index, 1)
            setCartItems([...cartItems]);
            Swal.fire({
                icon: "success",
                title: "Successfully deleted",
                text: `Product ${inCart.product.name} deleted from cart`
            })
            console.log("Successfully deleted")
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


