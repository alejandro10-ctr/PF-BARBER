//import {useReducer} from 'react'
//import { TYPES } from '../../redux/actions';
// import { initialState, reducer } from '../../redux/reducer';
import {useSelector} from "react-redux"
import CartItem from './CartItem';
import ProductItem from './ProductsItem';
import './ShoppingCart.css'
import { addToCart, delFromCart, clearCart } from '../../redux/actions';
import DetailProduct from "../DetailProducts/DetailProducts";

const ShoppingCart = () => {

    const products = useSelector((state)=> state.products)
    const cart = useSelector((state)=> state.cart)
    const localStorage = useSelector((state)=> state.localStorage)
//    const [state, dispatch] = useReducer(
//     initialState, 
//     reducer
//     );
   // const [state, dispatch] = useReducer();
   
   
   // const {products, cart, localStorage} = state;
/* 
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
    }; */


    //******* LOCAL STORAGE ******/

    function addToLocalStorage(product){
     let productos = getProductsLs();
     productos.push(product);
     localStorage.setItem('products',  JSON.stringify(productos))  // => 'products' o 'productos' ?
    };

    function getProductsLs(){
        if(localStorage.getItem('products') === null){
            localStorage = []   // let productsLs = []
        }else{
            localStorage = JSON.parse(localStorage.getItem('products'))
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
      localStorage.getItem('products', JSON.stringify(productsLs))
    };

    function cleanLs (){
      localStorage.clear();   
    }


    function readLocalStorage(){
        let productsLs = getProductsLs();
        const cardLs= productsLs.forEach((product)=> {
          return(
            <div>
                <img alt="not found">{product.image}</img>
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
            </div>
          )
        })
        return cardLs
    }


return (
    <div>
        <h2>Barber Shop🛒</h2>
        <h3>Products</h3>
        <article className="box grid-responsive">
        {
            products.map((products)=> <DetailProduct key={products.id} data={products} addToCart={addToCart} />)
        }    
        </article>
        <h3>Buy!!</h3>
        <article className='box'>
            <button onClick={clearCart}>Clean🛒</button>
            {
                cart.map((item, index)=> <CartItem key={index} data={item} delFromCart={delFromCart}/>)
            }
        </article>
    </div>
 )
}


export default ShoppingCart;