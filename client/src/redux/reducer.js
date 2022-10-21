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
  PRICE_LOWER,
  PRICE_HIGH,
  TYPES,
  SORT_SCORE,
  FILTER_QUALITY,
  FILTER_SHOP,
  GET_PAYMENTS
} from "./actions";

const initialState = {
  loading: false,
  products: [],
  users: [],
  detail: [],
  allProducts: [],
  cart: [],
  localStorage: [],
  filterstate: [],
  error: '',
  payMercadoPago: {}
};



export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_PAYMENTS:
      return{ ...state, payMercadoPago: {...payload}}
    case SET_LOADING:
      return { ...state, ...payload };
    case GET_PRODUCTS:
      return { ...state, allProducts: [...payload], products: [...payload], filterstate: [...payload] };
    // case CREATE_PRODUCTS:
    //   return { ...state, products: payload };
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
      return { ...state, products: payload };

    //--------------------------SCORE
    // case SORT_SCORE:
    // const sortScore = state.products
    // const sortByScore = payload === 'bottom' ? sortScore.sort(function (a, b) {
    //   if (a.score > b.score) {
    //     return -1;
    //   }
    //   if (b.score > a.score) {
    //     return 1;
    //   }
    //   return 0
    // }) : sortScore.sort(function (a, b) {
    //   if (a.score > b.score) {
    //     return 1;
    //   }
    //   if (b.score > a.score) {
    //     return -1;
    //   }
    //   return 0;
    // })
    // return {
    //   ...state,
    //   products: sortByScore
    // }
    //--------------------------PRICE
    case PRICE_HIGH:
      let stateProd = state.products
      return {
        ...state,
        products: stateProd.slice().sort((a, b) => {

          return a.price - b.price
        }).reverse()
      }
    case PRICE_LOWER:
      let statePr = state.products
      return {
        ...state,
        products: statePr.slice().sort((a, b) => {
          return a.price - b.price
        })

      }

    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(product => product.id === payload); // CHEQUEAR QUE SEA PRODUCTSTOCART.ID O PRODUCTS.ID
      // console.log(newItem)
      let itemInCart = state.cart.find(item => item.id === newItem.id)

      return itemInCart ? {
        ...state,
        cart: state.cart.map(item => item.id === newItem.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item)
      }
        :
        {
          ...state,
          cart: [...state.cart, { ...newItem, quantity: 1 }],
        }

    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find(item => item.id === payload);

      return itemToDelete.quantity > 1 ? {
        ...state,
        cart: state.cart.map(item => item.id === payload ? { ...item, quantity: item.quantity - 1 } : item)
      }
        :
        {
          ...state,
          cart: state.cart.filter(item => item.id !== payload)
        };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      }
    }
    case TYPES.CLEAR_CART:
      return 'shoppingInitialState';

    // case FILTER_QUALITY:    
    // const all = state.products;
    // const filter = payload === 'Premium' ? all.filter(r => r.quality === "Premium"): all.filter(r => r.quality === "Basic")
    // return {
    //     ...state,
    //     allProducts: filter //lista que recortamos lo que necesitemos
    // };
    case FILTER_QUALITY:
      const all = state.allProducts;
      const filter = payload === 'default' ? all: all.filter(r => r.quality.toLowerCase() === payload.toLowerCase())
      return {
        ...state,
      products: filter,
      filterstate: filter
      };
    case FILTER_SHOP:
      const allAccesory = state.filterstate;

      const logicFilter = payload === 'all' ? allAccesory
        : allAccesory.filter(r => r.name.toLowerCase().includes(payload.toLowerCase()))

      return {
        ...state,
        products: logicFilter
      };


      // case FILTER_SHOP:
      //   const allAccesory = state.products;
        
      //   if (allAccesory) {
  
      //     const logicFilter = payload === 'all' ? allAccesory
      //       : allAccesory.filter(r => r.name.toLowerCase().includes(payload.toLowerCase()))
      //     return {
      //       ...state,
      //       allProducts: logicFilter
      //     };
      //   } else if (!allAccesory) {
      //     const logicFilter = payload === 'all' ? allAccesory
      //       : allAccesory.filter(r => r.name.toLowerCase().includes(payload.toLowerCase()))
      //     return {
      //       ...state,
      //       filterstate: logicFilter
      //     };
      //   }
      //-------------error
      case "FAILURE":
        return{
          ...state,
          error: payload
        }

    default:
      return state;
  }
};
