import {
  SET_LOADING,
  GET_PRODUCTS,
  CREATE_PRODUCTS,
  UPDATE_PRODUCTS,
  DELETE_PRODUCTS,
  CREATE_USERS,
  GET_USERS,
  UPDATE_USERS,
  DELETE_USERS,
  GET_DETAILPRODUCT,
  CLEAR_PRODUCTS_DETAILS,
  SEARCH_PRODUCTS,
  SORT_PRICE,
  ORDER_BY_SCORE,
} from "./actions";

const initialState = {
  loading: false,
  products: [{
    id : 1,
    name: "tijera",
    price: 200,
    quantity: 20,
    stock: 5,
    code: "123",
    imageProfile: "https://media.istockphoto.com/photos/isolated-shot-of-opened-black-handle-scissors-on-white-background-picture-id175601846?k=20&m=175601846&s=612x612&w=0&h=9avNkvSxOf1bAv27bdiZB0HU5_GAZvgFv6TE6pxvdYk="
  }],
  users: [],
  detail: [],
  allProducts: [],
};



export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, ...payload };
    case GET_PRODUCTS:
      return { ...state, products: payload };
    case CREATE_PRODUCTS:
      return { ...state, products: payload };
    case UPDATE_PRODUCTS:
      return { ...state, products: payload };
    case DELETE_PRODUCTS:
      return { ...state, products: payload };
    case CREATE_USERS:
      return { ...state, users: payload };
    case GET_USERS:
      return { ...state, users: payload };
    case UPDATE_USERS:
      return { ...state, users: payload };
    case DELETE_USERS:
      return { ...state };
    case GET_DETAILPRODUCT:
      return { ...state, detail: payload };
    case CLEAR_PRODUCTS_DETAILS:
      return {
        ...state,
        detail: [],
      };
    case SEARCH_PRODUCTS:
      return { ...state, allProducts: payload };

    case SORT_PRICE:
      const sortPrice = state.products;
      const sortLower =
        payload === "lower"
          ? sortPrice.sort(function (a, b) {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            })
          : sortPrice.sort(function (a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        products: sortLower,
      };
    case ORDER_BY_SCORE:
      let sortedByScore = [...state.products];
      sortedByScore =
        payload === "high"
          ? state.products.sort(function (a, b) {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            })
          : state.products.sort(function (a, b) {
              if (a.score < b.score) return 1;
              if (a.score > b.score) return -1;
              return 0;
            });
      return {
        ...state,
        products: sortedByScore,
      };

    default:
      return state;
  }
};
