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
    score: 20,
    id : 1,
    name: "tijera",
    price: 200,
    quantity: 20,
    stock: 5,
    code: "123",
    imageProfile: "https://media.istockphoto.com/photos/isolated-shot-of-opened-black-handle-scissors-on-white-background-picture-id175601846?k=20&m=175601846&s=612x612&w=0&h=9avNkvSxOf1bAv27bdiZB0HU5_GAZvgFv6TE6pxvdYk="
  },{
    score: 50,
    id : 3,
    name: "Mano",
    price: 5400,
    quantity: 40,
    stock: 52,
    code: "144",
    imageProfile: "https://static8.depositphotos.com/1049680/1018/i/600/depositphotos_10182313-stock-photo-hand-symbol.jpg"
},
{
  id : 5,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://i0.wp.com/megabahia.com/wp-content/uploads/2020/04/atomizador-de-pl%C3%A1stico-para-peluqueria-mega-bah%C3%ADa.jpg?resize=247%2C296&ssl=1"
},
{
  id : 87435634,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://www.productospeluqueriacastro.com/8416-home_default/paletina-tinte-peluqueria.jpg"
},
{
  id : 4,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://www.pinedoyvilla.com/imagenes/productos/familia_20/familia_73298/6460188-2.jpg"
},
{
  id : 6,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://www.comercialmoctezuma.com/archivo/2013/03/tij-lila-500x500.png"
},
{
  id : 7,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaMWI1A5n9y2UHQUJ7dw7k94K4V-vtnk06A&usqp=CAU"
},
{
  id : 8,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://noticiaspmy.com/wp-content/uploads/2020/04/peluqeria.png"
},
{
  id : 9,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://media.istockphoto.com/photos/isolated-shot-of-opened-black-handle-scissors-on-white-background-picture-id175601846?k=20&m=175601846&s=612x612&w=0&h=9avNkvSxOf1bAv27bdiZB0HU5_GAZvgFv6TE6pxvdYk="
},
{
  id : 1256,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://images.milanuncios.com/api/v1/ma-ad-media-pro/images/396fb521-ea28-469d-89e0-d8bf5f7dee2c?rule=detail_640x480_jpeg"
},
{
  id : 1743,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://i.pinimg.com/474x/63/0f/54/630f547cb0ccd4524454c8f815b4563a.jpg"
},
{
  id : 654,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://media.istockphoto.com/photos/isolated-shot-of-opened-black-handle-scissors-on-white-background-picture-id175601846?k=20&m=175601846&s=612x612&w=0&h=9avNkvSxOf1bAv27bdiZB0HU5_GAZvgFv6TE6pxvdYk="
},
{
  id : 213,
  name: "tijera",
  price: 200,
  quantity: 20,
  stock: 5,
  code: "123",
  imageProfile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUbtqmZ1ClNNAFC386N_u08HmTqzGnigwSQ&usqp=CAU"
}
],



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
        payload === "lower"
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
