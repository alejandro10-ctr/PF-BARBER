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
    name: "Beard Balm",
    price: 200,
    quantity: "Premium",
    stock: 5,
    code: "123",
    imageProfile: "https://http2.mlstatic.com/D_NQ_NP_2X_959303-MLA51602582272_092022-F.webp"
  },{
    score: 50,
    id : 3,
    name: "Mühle Razor Gillette® Fusion Vivo Series Plumtree",
    price: 5400,
    quantity: "Basic",
    stock: 52,
    code: "144",
    imageProfile: "https://www.giftsandcare.com/12277-home_default_carousel/muehle-razor-gillette-fusion-vivo-series-plumtree.jpg"
},
{
  id : 5,
  name: "Edwin Jagger Marfil",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg"
},
{
  id : 87435634,
  name: "Brosh Super Hard Gel 200gr",
  price: 200,
  quantity: "Basic",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg"
},
{
  id : 4,
  name: "Mühle Double Edge Safety Razor R89 Rose Gold Close Comb",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg"
},
{
  id : 6,
  name: "Fatip Chrome Slant Double Edge Safety Razor",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg"
},
{
  id : 7,
  name: "Omega Garnet Shaving Bowl",
  price: 200,
  quantity: "Basic",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/6329-large_default/brocha-de-afeitar-pelo-sintetico-roja-omega-s10018.jpg"
},
{
  id : 8,
  name: "Fatip Piccolo Gold Slant Close Open Double Edge Safety Razor",
  price: 200,
  quantity: "Basic",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/16511-large_default/fatip-piccolo-gold-slant-close-open-double-edge-safety-razor.jpg"
},
{
  id : 9,
  name: "Baxter of California Shave Tonic",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg"
},
{
  id : 1256,
  name: "Captain Fawcett Barberism Pre-Shave Oil 50ml",
  price: 300,
  quantity: "Basic",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg"
},
{
  id : 1743,
  name: "Hey Joe Pre Shave Oil 50ml",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg"
},
{
  id : 654,
  name: "After Shave BeardLovers",
  price: 200,
  quantity: "Basic",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg"
},
{
  id : 213,
  name: "Cella Milano Bio Aloe Vera After Shave Balm 100ml",
  price: 200,
  quantity: "Premium",
  stock: 5,
  code: "123",
  imageProfile: "https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg"
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
