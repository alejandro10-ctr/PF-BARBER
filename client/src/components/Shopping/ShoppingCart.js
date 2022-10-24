import { createContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateToCart, addToCart, delFromCart, getDBCart, createDBCart, updateDBCart, deleteDBCart, } from "../../redux/actions";
import './ShoppingCart.css'



export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const productosenLocalStorage = localStorage.getItem("products");
            return productosenLocalStorage ? JSON.parse(productosenLocalStorage) : [];
        } catch (error) {
            return []
        }
    });

    const [isLogueado, setLogueado] = useState(() => {
        try {
            const logueadoLocalStorage = localStorage.getItem("logueado");
            return logueadoLocalStorage ? JSON.parse(logueadoLocalStorage) : false;
        } catch (error) {
            return false
        }
    });
    const [isSaveDB, setSaveDB] = useState(() => {
        try {
            const SaveDBLocalStorage = localStorage.getItem("isSaveDB");
            return SaveDBLocalStorage ? JSON.parse(SaveDBLocalStorage) : false;
        } catch (error) {
            return false
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));

    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("logueado", isLogueado);

    }, [isLogueado]);
    useEffect(() => {
        localStorage.setItem("isSaveDB", isSaveDB);
        if (!isSaveDB && isLogueado) {
            setSaveDB(true)
            //crear en db el carrito 1 sola vez
            console.log("guardado el carrito ----> DB")
            dispatch(createDBCart(cartItems, 1))
            console.log("obteniendo carrito ----> DB")
            Swal.showLoading()
            setTimeout(()=>dispatch(getDBCart(1)),1000)
            
        }
    }, [isSaveDB]);

    useEffect(() => {
        setCartItems([...cart])
        console.log("final")
      Swal.hideLoading("Listo")
    }, [cart]);
    //-----------------> Login
    const logIn = () => {
        setLogueado(true)
        setSaveDB(false)
    }
    const SignOff = () => {
        setLogueado(false)
        setCartItems([])
        dispatch(updateToCart([]))

    }
    //<--------------

    const addItemToCart = (detailProduct, quantity) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );


        let isShowDialog = false
        if (inCart) {
            if (quantity ? quantity : inCart.quantity + 1 <= inCart.product.stock) {
                inCart.quantity = quantity ? quantity : inCart.quantity + 1
                setCartItems([...cartItems])

                dispatch(updateToCart(cartItems))
                if(isLogueado){
                    dispatch(updateDBCart(inCart))
                }
                return
            }
            isShowDialog = true
        } else {

            if (quantity ? quantity : 1 <= detailProduct.stock) {
                const detailSale = {
                    quantity: quantity ? quantity : 1,
                    iva: 0,
                    description: "",
                    state: 2,
                    descriptionState: "",
                    productId: detailProduct.id,
                    saleId: null,
                    userId: null,
                    product: detailProduct
                }
                cartItems.push(detailSale)
                setCartItems([...cartItems])
                if(isLogueado){
                    dispatch(createDBCart(detailSale,1))
                    console.log("obteniendo carrito ----> DB")
                    Swal.showLoading()
                    setTimeout(()=>dispatch(getDBCart(1)),1000)
                }else dispatch(updateToCart(cartItems))
                
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
        if (inCart) {
            if (inCart.quantity > 1) {
                inCart.quantity--
                setCartItems([...cartItems])

                dispatch(updateToCart(cartItems))
                if(isLogueado){
                    dispatch(updateDBCart(inCart))
                }
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
        if (inCart) {
            cartItems.splice(cartItems.indexOf(inCart), 1)
            setCartItems([...cartItems]);

            dispatch(updateToCart(cartItems))
            if(isLogueado){
                dispatch(deleteDBCart(inCart.id))
            }

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
        <CartContext.Provider value={{ isLogueado, logIn, SignOff, cartItems, addItemToCart, subtractItemToCart, deleteItemToCart }}>
            {children}
        </CartContext.Provider>
    )



};
