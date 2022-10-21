import axios from "axios";
import Swal from "sweetalert2";

export const SET_LOADING = "SET_LOADING";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const CREATE_PRODUCTS = "CREATE_PRODUCTS";
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
export const DELETE_PRODUCTS = "DELETE_PRODUCTS";
export const CREATE_USERS = "CREATE_USERS";
export const GET_USERS = "GET_USERS";
export const DELETE_USERS = "DELETE_USERS";
export const UPDATE_USERS = "UPDATE_USERS";
export const CLEAR_PRODUCTS_DETAILS = "CLEAR_PRODUCTS_DETAILS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const PRICE_LOWER = "PRICE_LOWER";
export const PRICE_HIGH = "PRICE_HIGH";
export const GET_DETAILPRODUCT = "GET_DETAILPRODUCT";
export const FILTER_QUALITY = "FILTER_QUALITY";
export const FILTER_SHOP = "FILTER_SHOP";
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART"; 
export const GET_LOCALSTORAGE = "GET_LOCALSTORAGE";
export const ADD_LOCALSTORAGE = "ADD_LOCALSTORAGE"
// export const SORT_SCORE ="SORT_SCORE";
// export const SCORE_LOWER = "SCORE_LOWER"
// export const SCORE_HIGH = "SCORE_HIGH"


export function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: { loading: value } });
  };
}

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
export function createProducts(product, errorCallback) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`/products`, product); //chequeada con yei-barbi
      if (response?.data) {
        dispatch(setLoading(false));
        return dispatch({
          type: CREATE_PRODUCTS,
          payload: response.data,
        });
        //dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function updateProducts(product, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/products/${product.id}`, product); //chequeada con yei-barbi
      if (response?.data) {
        return dispatch({
          type: UPDATE_PRODUCTS,
          payload: response.data,
        });
        //dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function deleteProducts(product, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/products/${product.id}`); //chequeada con yei-barbi
      if (response?.data) {
        return dispatch({
          type: DELETE_PRODUCTS,
          payload: response.data,
        });
        // dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function createUsers(users, errorCallback) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`/users`, users); //chequeada con yei-barbi
      if (response?.data) {
        dispatch(setLoading(false));
        return dispatch({
          type: CREATE_USERS,
          payload: response.data,
        });
        //dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function getUsers(errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users`); //chequeada con yei-barbi
      if (response?.data) {
        dispatch({ type: GET_USERS, payload: { users: response.data } });
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function deleteUsers(users, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/users/${users.id}`); //falta, se agregara..volver a revisar
      if (response?.data) {
        return dispatch({
          type: DELETE_USERS,
          payload: response.data,
        });
        // dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
    }
  };
}
export function updateUsers(users, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${users.id}`, users); //falta, se agregara..volver a revisar
      if (response?.data) {
        return dispatch({
          type: UPDATE_USERS,
          payload: response.data,
        });
        //dispatch(getProducts());
      }
    } catch (error) {
      errorCallback && errorCallback(error);
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
    } catch (error) {
      errorCallback && errorCallback(error);
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
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "We don't found the product ☹!",
      });
      //return alert("Please search a product")
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

export function addToCart(id){
  return {
    type: ADD_TO_CART, 
    payload:id
  }
}

export function delFromCart(id, all=false){
  if(all===true){
    return{type: REMOVE_ALL_FROM_CART, payload:id};
}else{
    return{type: REMOVE_ONE_FROM_CART, payload:id};
  }
};

export function clearCart(){
  return{
    type: CLEAR_CART,

  }
}
export function getLocalStorage(){
  return {
    type: GET_LOCALSTORAGE,
  }
}

export function addLocalStorage(id){
  return {
    type: ADD_LOCALSTORAGE,
    payload: id
  }
}