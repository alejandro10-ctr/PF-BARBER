import {useReducer} from 'react'
import { TYPES } from '../../redux/shoppingActions';
import { shoppingInitialState, shoppingReducer } from '../../redux/shoppingReducer';
import CartItem from './CartItem';
import ProductItem from './ProductsItem';
import './ShoppingCart.css'

const ShoppingCart = () => {
   const [state, dispatch] = useReducer(
    shoppingReducer, 
    shoppingInitialState
    );
   
    const {productsToCart, cart, localStorage} = state;

    const addToCart = (id) => {
       // console.log(id)
        dispatch({type: TYPES.ADD_TO_CART, payload:id})
        addToLocalStorage(id)
    };

    const delFromCart = (id, all=false) => {
       // console.log(id, all);
        if(all===true){
            dispatch({type: TYPES.REMOVE_ALL_FROM_CART, payload:id});
        }else{
            dispatch({type: TYPES.REMOVE_ONE_FROM_CART, payload:id});
        }
        deleteProductLs(id);
    };

    const clearCart = () => {
        dispatch({type: TYPES.CLEAR_CART});
        cleanLs();
    };


    //******* LOCAL STORAGE ******/

    function addToLocalStorage(product){
     let productos = getProductsLs();
     productos.push(product);
     localStorage.setItem('productsToCart',  JSON.stringify(productos))  // => 'products' o 'productos' ?
    };

    function getProductsLs(){
        if(localStorage.getItem('productsToCart') === null){
            localStorage = []   // let productsLs = []
        }else{
            localStorage = JSON.parse(localStorage.getItem('productsToCart'))
        }
        return localStorage;  // return productsLs;
    };

    function deleteProductLs (id){
      let productsLs = getProductsLs();
      productsLs.forEach((productsLs, index)=> {
        if(productsLs.id === id){
            productsLs.splice(index, 1)
        }
      });
      localStorage.getItem('productsToCart', JSON.stringify(productsLs))
    };

    function cleanLs (){
      localStorage.clear();   
    }


    function readLocalStorage(){
        let productsLs = getProductsLs();
        const cardLs= productsLs.forEach((product)=> {
          return(
            <div>
                <img>{product.image}</img>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
          )
        })
        return cardLs
    }


return (
    <div>
        <h2>Shopping Cart</h2>
        <h3>Products</h3>
        <article className="box grid-responsive">
        {
            productsToCart.map((productsToCart)=> <ProductItem key={productsToCart.id} data={productsToCart} addToCart={addToCart} />)
        }    
        </article>
        <h3>Cart</h3>
        <article className='box'>
            <button onClick={clearCart}>Clean Cart</button>
            {
                cart.map((item, index)=> <CartItem key={index} data={item} delFromCart={delFromCart}/>)
            }
        </article>
    </div>
 )
}


export default ShoppingCart;