import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    updateToCart,
    getDBCart,
    createDBCart,
    updateDBCart,
    deleteDBCart,
} from "../../redux/actions";
import "./ShoppingCart.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState(() => {
        try {
            const productosenLocalStorage = localStorage.getItem("products");
            return productosenLocalStorage ? JSON.parse(productosenLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });
    const verificar = () => {
        try {
            const cookies = new Cookies();
            const token = cookies.get("token");
            if (token) {
                const tokenDecode = jwt_decode(token);
                return tokenDecode.id
            }
            return 0;
        } catch (error) {
            return 0;
        }

    }
    const [userId, setUserId] = useState(verificar());

    const [isSaveDB, setSaveDB] = useState(() => {
        try {
            const SaveDBLocalStorage = localStorage.getItem("isSaveDB");
            return SaveDBLocalStorage ? JSON.parse(SaveDBLocalStorage) : false;
        } catch (error) {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {

    }, [userId]);
    useEffect(() => {
        localStorage.setItem("isSaveDB", isSaveDB);
        if (!isSaveDB && userId) {
            setSaveDB(true);
            //crear en db el carrito 1 sola vez
           //"guardado el carrito ----> DB"
            dispatch(createDBCart(cartItems, userId));
            //"obteniendo carrito ----> DB"
            Swal.showLoading();
            setTimeout(() => dispatch(getDBCart(userId)), 1000);
        }
    }, [isSaveDB]);

    useEffect(() => {
        if (userId) {
            setCartItems([...cart]);
            //"finalCartDB"
            Swal.hideLoading("Listo");
        }
    }, [cart]);
    //-----------------> Login
    const logIn = () => {
        setUserId(verificar())
        setSaveDB(false);
    };
    const SignOff = () => {
        setUserId(verificar())
        setCartItems([]);
        dispatch(updateToCart([]));
    };
    //<--------------

    const addItemToCart = (detailProduct, quantity) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );

        let isShowDialog = false;
        if (inCart) {
            if (quantity ? quantity : inCart.quantity + 1 <= inCart.product.stock) {
                inCart.quantity = quantity ? quantity : inCart.quantity + 1;
                setCartItems([...cartItems]);

                dispatch(updateToCart(cartItems));
                if (userId) {
                    dispatch(updateDBCart(inCart));
                }
                return;
            }
            isShowDialog = true;
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
                    product: detailProduct,
                };
                cartItems.push(detailSale);
                setCartItems([...cartItems]);
                if (userId) {
                    dispatch(createDBCart(detailSale, userId));
                    //"obteniendo carrito ----> DB"
                    Swal.showLoading();
                    setTimeout(() => dispatch(getDBCart(userId)), 1000);
                } else dispatch(updateToCart(cartItems));

                return;
            }
            isShowDialog = true;
        }
        if (isShowDialog) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Not in stock",
            });
        }
    };

    const subtractItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );
        if (inCart) {
            if (inCart.quantity > 1) {
                inCart.quantity--;
                setCartItems([...cartItems]);

                dispatch(updateToCart(cartItems));
                if (userId) {
                    dispatch(updateDBCart(inCart));
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You can buy from 1",
                });
            }
        }
    };
    const deleteItemToCart = (detailProduct) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart.productId === detailProduct.id
        );
        if (inCart) {
            cartItems.splice(cartItems.indexOf(inCart), 1);
            setCartItems([...cartItems]);

            dispatch(updateToCart(cartItems));
            if (userId) {
                dispatch(deleteDBCart(inCart.id));
            }

            Swal.fire({
                icon: "error",
                title: "Successfully deleted",
                text: `Product ${inCart.product.name} delete from cart`,
            });
        }
    };

    return (
        <CartContext.Provider
            value={{
                userId,
                logIn,
                SignOff,
                cartItems,
                addItemToCart,
                subtractItemToCart,
                deleteItemToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
