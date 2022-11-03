import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductsDetail,
  getDBCart,
  getPaymentLink,
  getDBUser,
} from "../../redux/actions";
import { CartContext } from "../Shopping/ShoppingCart";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
// import Score from '../Score/score'
import Carrusel from "./detailCarru";
import s from "./DetailProducts.module.css";
import Score from "../Score/Score"
// import styles from '../DetailProducts/DetailProducts.module.css';

function DetailProduct({ match }) {
  const { userId, addItemToCart, subtractItemToCart, deleteItemToCart } =
    useContext(CartContext);
  const [update, setUpdate] = useState(true);
  const [goPay, setGoPay] = useState(false);
  const dispatch = useDispatch();
  const id = Math.round(match.params.id);
  const product = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  let pay = useSelector((state) => state.payMercadoPago);
  const history = useHistory()

  function updateProductInCar() {
    return cart.find(
      (productInCar) => productInCar.productId === Math.round(id)
    );
  }
  const [productInCar, setProducInCar] = useState(updateProductInCar());

  useEffect(() => {
    if (update) {
      dispatch(getProductsDetail(id)); // accedo al id del detalle

      if (userId) {
        dispatch(getDBCart(userId));
      }
      setUpdate(false);
    }
  }, [update]); // muestra recien cuando el componente se monta

  useEffect(() => {
    if (cart.length) {
      console.log("cartDetailProduct", cart);
      setProducInCar(updateProductInCar());

      if (goPay) {
        Swal.showLoading();
        setTimeout(() => dispatch(getPaymentLink(id, userId)), 2000);
      }
    }
  }, [cart]);
  useEffect(() => {
    if (Object.keys(pay).length) {
      setGoPay(false);
    }
  }, [pay]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getDBUser(userId));
    }
  }, []);

//-------carrusel
  let items = document.querySelectorAll('.carousel .carousel-item')

  items.forEach((el) => {
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.children[0])
          next = next.nextElementSibling
      }
  })





  return (
    <div className={s.background}>
      <div>
        {/* <Link to="/">Back</Link> */}
        {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}

        <hr />
        {/*  <div className={s.seMore}>
        <Link to="/shop">
          {" "}
          <button className={s.button}>See more products!</button>
        </Link>
      </div>
 */}
        {/* Card */}
          <div className={s.contenedor}>
            <div>
              <h3 className={s.name}>{product.name}</h3>
              <h3 className={s.price}>Price:${product.price}</h3>
            </div>
            <div>
              <img src={product.image} alt={product.image} className={s.img} />
            </div>
            <div className={s.columna}>
              <h3 className={s.quality}>QUALITY: {product.quality}</h3>
              <h3 className={s.quality}>SCORE: {product.score}</h3>
              {/* <h3 className={s.score}>SCORE: { <Score score={product.score}/>}</h3> */}
             
              <div className={s.btncarrito}>
        
        {productInCar ? (
          <span className={s.btnDelete}>
          <button
            class="btn btn-dark"
            onClick={async (e) => {
              e.preventDefault();
              await deleteItemToCart(product);
              history.push('/shop')
            }}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-cart-x-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
            </svg>
          </button>
        </span>
        ) : null}
          {productInCar ? (
            <span className={s.btnSubstract}>
              <button
                class="btn btn-dark"
                onClick={async (e) => {
                  e.preventDefault();
                  await subtractItemToCart(product);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart-dash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" />
                </svg>{" "}
              </button>
            </span>
          ) : null}
          {productInCar ? (
            <span className={s.btnAdd}>
              <button
                class="btn btn-dark"
                onClick={async (e) => {
                  e.preventDefault();
                  await addItemToCart(product);
                }}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-cart-plus-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                </svg>{" "}
              </button>
            </span>
            
          ) : null}
          {productInCar ? (
            <div className={s.quantity}>
              <h3>Quantity: {productInCar.quantity}</h3>
            </div>
          ) : null}
        

        {Object.keys(pay).length ? (
          <a
            className={s.button}
            target="_blank"
            rel="noopener"
            href={pay.init_point + ""}
          >
            GO PAY
          </a>
        ) : userId ? (
          <button
            className={s.button}
            onClick={(e) => {
              e.preventDefault();
              if (cart.length) {
                // const productInCar = cart.find((productInCar) => productInCar.productId === id)
                console.log(productInCar, cart);
                if (Object.keys(product).length) {
                  if (!productInCar?.quantity) Swal.showLoading();
                  setGoPay(true);
                  addItemToCart(product, productInCar?.quantity);
                }
              } else {
                if (Object.keys(product).length) {
                  setGoPay(true);
                  addItemToCart(product);
                }
              }
            }}
          >
            BUY NOW
          </button>
        ) : (
          <div className={s.inisec}>
            <Link to="/shop">
              {" "}
              <Button color="dark" outline className={s.inicio}>
                Inicia sesión para comprar
              </Button>
            </Link>
          </div>
        )}
      </div>
            </div>


          
          
      </div>
      <br>
      </br>
       </div>
       <Score></Score>
       <h2>Featured Products</h2>
       
      
      <div>
      <Carrusel/>
      </div>
    </div>
  );
}
export default DetailProduct;