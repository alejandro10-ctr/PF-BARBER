import axios from "axios";

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
export const SORT_PRICE = "SORT_PRICE";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const GET_DETAILPRODUCT = "GET_DETAILPRODUCT"

export const TYPES = {
  ADD_TO_CART : "ADD_TO_CART",
  REMOVE_ONE_FROM_CART : "REMOVE_ONE_FROM_CART",
  REMOVE_ALL_FROM_CART : "REMOVE_ALL_FROM_CART",
  CLEAR_CART : "CLEAR_CART",

};



export function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: { loading: value } });
  };
}

export function getProducts(errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products`);
      if (response?.data) {
        dispatch({ type: GET_PRODUCTS, payload: { products: response.data } });
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
      const response = await axios.post(`/products`, product);
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
      const response = await axios.put(`/products/${product.id}`, product);
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
      const response = await axios.delete(`/products/${product.id}`);
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
      const response = await axios.post(`/users`, users);
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
      const response = await axios.get(`/users`);
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
      const response = await axios.delete(`/users/${users.id}`);
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
      const response = await axios.put(`/users/${users.id}`, users);
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
      const response = await axios.get(`/products/${id}`);
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
export function searchProducts(name, errorCallback) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/name?name=${name}`);
      dispatch({ type: SEARCH_PRODUCTS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEARCH_PRODUCTS, payload: [] });
      throw alert("Product not found");
    }
  };
}
export function sortByPrice(payload) {
  return {
    type: SORT_PRICE,
    payload,
  };
}
export function orderByScore(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}
