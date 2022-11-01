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
  clearMyUser,
  getDBMyUser,
} from "../../redux/actions";
import "./ShoppingCart.css";
import { useHistory } from "react-router-dom";

export const CartContext = createContext();
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const CartProvider = ({ children }) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const myUser = useSelector((state) => state.myUser);
  const [updateUser, setUpdateUser] = useState(false);
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

  useEffect(async () => {
    if (userId) {
      //"obtener la info del logueado ----> DB"
      const response = await dispatch(getDBMyUser(userId))
      if (response) {
      } else {
        SignOff()
      }
    }
  }, [updateUser]);
  useEffect(async () => {
    localStorage.setItem("isSaveDB", isSaveDB);
    if (userId) {
      //"obtener la info del logueado ----> DB"
      const response = await dispatch(getDBMyUser(userId))
      if (response) {
        if (!isSaveDB) {
          setSaveDB(true);
          //crear en db el carrito 1 sola vez
          //"guardado el carrito ----> DB"
          await dispatch(createDBCart(cartItems, userId));
          //"obteniendo carrito ----> DB"
          Swal.showLoading();
          await dispatch(getDBCart(userId))
        }
      } else {
        SignOff()
      }
    }
  }, [isSaveDB]);

  useEffect(() => {
    if (userId) {
      setCartItems([...cart]);
      //"finalCartDB"
      Swal.hideLoading();
    }
  }, [cart]);
  //-----------------> Login
  const logIn = () => {
    setUserId(verificar())
    setSaveDB(false);
  };
  const SignOff = () => {
    const cookies = new Cookies();
    cookies.remove('token')
    setUserId(verificar())
    setCartItems([]);
    dispatch(updateToCart([]));
    dispatch(clearMyUser())
    history.push('/')
  };
  //<--------------

  const addItemToCart = async (detailProduct, quantity) => {
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
          await dispatch(createDBCart(detailSale, userId, true));
          //"obteniendo carrito ----> DB"
          Swal.showLoading();
          await dispatch(getDBCart(userId))
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


      Toast.fire({
        icon: 'error',
        title: `Product ${inCart.product.name} delete from cart`
      })
    }
  };

  return (
    <CartContext.Provider
      value={{
        userId,
        myUser,
        setUpdateUser,updateUser,
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