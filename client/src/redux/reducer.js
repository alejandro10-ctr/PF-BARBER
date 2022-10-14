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
  SORT_LOWER,
  SORT_HIGH,
  ORDER_BY_SCORE,
  TYPES,
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
  },{

    id : 3,
    name: "Mano",
    price: 5400,
    quantity: 40,
    stock: 52,
    code: "144",
    imageProfile: "https://static8.depositphotos.com/1049680/1018/i/600/depositphotos_10182313-stock-photo-hand-symbol.jpg"
}],



  users: [],
  detail: [],
  allProducts: [],
  cart: [],
  localStorage: [],
};


export default function reducer(state = initialState, { type, payload }){
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

    // case SORT_PRICE:
    //   const sortPrice = state.products;
    //   const sortPriceMetod = payload === "lower" ? sortPrice.sort(function (a, b) {
    //           if (a.price > b.price) {
    //             return -1;
    //           }
    //           if (b.price > a.price) {
    //             return 1;
    //           }
    //           return 0;
    //         })
    //       : sortPrice.sort(function (a, b) {
    //           if (a.price > b.price) {
    //             return 1;
    //           }
    //           if (b.price > a.price) {
    //             return -1;
    //           }
    //           return 0;
    //         });
    //   return {
    //     ...state,
    //     products: sortPriceMetod,
    //   };
//--------------------------SCORE
    case ORDER_BY_SCORE:
      let sortedByScore = [...state.products];
      sortedByScore =
        payload === "top"
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
//--------------------------PRICE
    case SORT_LOWER:
        let stateProd = state.products
        return {
            ...state,
            products: stateProd.slice().sort((a, b) =>{

                return a.price - b.price
            }).reverse()
        }
    case SORT_HIGH:
      let statePr = state.products
                return {
                ...state,
                products: statePr.slice().sort((a, b) =>{
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
       {...state,
        cart: [...state.cart, {...newItem, quantity: 1}],
    }
        
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
        let itemToDelete = state.cart.find(item => item.id === payload);
        
        return itemToDelete.quantity > 1 ? {
            ...state, 
            cart: state.cart.map(item => item.id === payload ? {...item, quantity: item.quantity - 1} : item)
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




    default:
      return state;
  }
};
