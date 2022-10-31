import axios from "axios";
import Swal from "sweetalert2";

export const SET_LOADING = "SET_LOADING";
export const GET_ADDRESSES = "GET_ADDRESSES";
export const GET_ADDRESS = "GET_ADDRESS";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USER = "GET_USER";
export const CREATE_USERS = "CREATE_USERS";
export const GET_USERS = "GET_USERS";
export const DELETE_USERS = "DELETE_USERS";
export const CLEAR_PRODUCTS_DETAILS = "CLEAR_PRODUCTS_DETAILS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const PRICE_LOWER = "PRICE_LOWER";
export const PRICE_HIGH = "PRICE_HIGH";
export const GET_DETAILPRODUCT = "GET_DETAILPRODUCT";
export const FILTER_QUALITY = "FILTER_QUALITY";
export const FILTER_SHOP = "FILTER_SHOP";
export const UPLOAD_IMG = "UPLOAD_IMG";
export const UPDATE_CART = "UPDATE_CART";
export const GET_VALIDATESTOCK_CART = "GET_VALIDATESTOCK_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const SUBTRACT_FROM_CART = "SUBTRACT_FROM_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_LOCALSTORAGE = "GET_LOCALSTORAGE";
export const GET_PAYMENTS = "GET_PAYMENTS";
export const ADD_PROD = "ADD_PROD";

// export const SORT_SCORE ="SORT_SCORE";
// export const SCORE_LOWER = "SCORE_LOWER"
// export const SCORE_HIGH = "SCORE_HIGH"
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: { loading: value } });
  };
}

//---------->Addresses
export function getDBAddresses(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${userId}/addresses`);
      if (response?.data) {
        return dispatch({
          type: GET_ADDRESSES,
          payload: response.data,
        });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function getDBAddress(addressId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/address/${addressId}`);
      if (response?.data) {
        return dispatch({
          type: GET_ADDRESS,
          payload: response.data,
        });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function createAddress(address, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/${userId}/addresses`, address);
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function updateAddress(address) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/users/addresses/${address.id}`,
        address
      );
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function deleteAddress(addressId) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/users/addresses/${addressId}`);
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
//<----------------

export function getProducts(errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products`); //chequeada con yei-barbi
      if (response?.data) {
        dispatch({ type: GET_PRODUCTS, payload: response.data });
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function createProducts(product) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`/products`, product); //chequeada con yei-barbi
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function updateProducts(id, product) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/products/${id}`, product); //chequeada con yei-barbi
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch (error) {
      // console.log(error);
    }
  };
}

export function deleteProducts(product, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/products/${product.id}`); //chequeada con yei-barbi
      return response?.data;
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
// export function deleteProducts(product, errorCallback) {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(`/products/${product.id}`); //chequeada con yei-barbi
//       Toast.fire({
//         icon: "success",
//         title: response.data,
//       });
//       return true;
//     } catch ({ response }) {
//       Toast.fire({
//         icon: "warning",
//         title: response.data,
//       });
//       return false;
//     }
//   };
// }
export function getDBUser(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${userId}`); //chequeada con yei-barbi
      if (response?.data) {
        return dispatch({
          type: GET_USER,
          payload: response.data,
        });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function createUsers(users, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users`, users); //chequeada con yei-barbi
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function getUsers(errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users`); //chequeada con yei-barbi
      if (response?.data) {
        dispatch({ type: GET_USERS, payload: response.data });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function deleteUsers(users, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/users/${users.id}`); //falta, se agregara..volver a revisar
      Toast.fire({
        icon: "success",
        title: response.data,
      });
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function updateUsers(users, showDialog) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${users.id}`, users); //LISTO, NO MODIFICAR
      if (showDialog) {
        Toast.fire({
          icon: "success",
          title: response.data,
        });
      }
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function getProductsDetail(id, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/${id}`); //chequeada con yei-barbi
      if (response?.data) {
        dispatch({ type: GET_DETAILPRODUCT, payload: response.data });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function clearDetail() {
  return {
    type: CLEAR_PRODUCTS_DETAILS,
  };
}
export function searchProducts(name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products?name=${name}`); //chequeada con yei-barbi
      dispatch({ type: SEARCH_PRODUCTS, payload: response.data });
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function priceLower(payload) {
  return {
    type: PRICE_LOWER,
    payload,
  };
}

export function priceHigh(payload) {
  return {
    type: PRICE_HIGH,
    payload,
  };
}

export function filterQuality(payload) {
  return {
    type: FILTER_QUALITY,
    payload,
  };
}

export function filterShop(payload) {
  return {
    type: FILTER_SHOP,
    payload,
  };
}

// export function scoreLower(payload) {
//   return {
//     type: SCORE_LOWER,
//     payload,
//   };
// }

// export function sortScore(payload) {
//   return {
//     type: SORT_SCORE,
//     payload,
//   };
// }

//actions for delete & add ----> IMAGES
// falta ruta delete y post de imagenes

export function getDBCart(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/detailsales/user/${userId}`);
      if (response?.data) {
        dispatch({ type: UPDATE_CART, payload: response.data });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function getDBCartValidateStock(userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/detailsales/user/${userId}/validatestock`
      );
      if (response?.data) {
        dispatch({ type: GET_VALIDATESTOCK_CART, payload: response.data });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}

export function createDBCart(cart, userId, showDialog) {
  return async () => {
    try {
      const response = await axios.post(`/detailsales/user/${userId}`, cart);
      if (showDialog) {
        Toast.fire({
          icon: "success",
          title: response.data,
        });
      }
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function updateDBCart(productInCart) {
  return async () => {
    try {
      console.log("updateDB", productInCart);
      return await axios.put(`/detailsales/${productInCart.id}`, productInCart);
    } catch (error) {
      return error;
    }
  };
}

export function deleteDBCart(productInCartId, showDialog) {
  return async () => {
    try {
      const response = await axios.delete(`/detailsales/${productInCartId}`);
      if (showDialog) {
        Toast.fire({
          icon: "success",
          title: response.data,
        });
      }
      return true;
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}
export function updateToCart(cart) {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
}
export function addToCart(product, quantity) {
  return {
    type: ADD_TO_CART,
    payload: product,
    quantity,
  };
}

export function delFromCart(product, all = false) {
  if (all) {
    return { type: REMOVE_ITEM_FROM_CART, payload: product };
  } else {
    return { type: SUBTRACT_FROM_CART, payload: product };
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}
export function getLocalStorage() {
  return {
    type: GET_LOCALSTORAGE,
  };
}

export function getPaymentLink(productId, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/payments/pay?productId=${productId}&userId=${userId}`
      );
      if (response?.data) {
        dispatch({ type: GET_PAYMENTS, payload: response.data });
      }
    } catch ({ response }) {
      Toast.fire({
        icon: "warning",
        title: response.data,
      });
      return false;
    }
  };
}

export function addProd(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post("/products", payload);
      return dispatch({
        type: ADD_PROD,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function uploadImg(payload) {
  return async function (dispatch) {
    try {
      var response = await axios.post("/dash/products/add/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      return dispatch({
        type: UPLOAD_IMG,
        payload: response.data, //url
      });
    } catch (err) {
      console.log(err);
    }
  };
}
