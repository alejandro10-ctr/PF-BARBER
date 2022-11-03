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
import Carrusel from "./detailCarru";
import s from "./DetailProducts.module.css";
import Score from "../Score/Score"


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

  return (
    <div className={s.background}>
      <div>

        <div className={s.contenedor}>
          <div>
            <h3 className={s.name}>{product.name}</h3>
            <span className={s.quality}>Quality - {product.quality}</span> <br /><br />
            <h5 className={s.description}>{product.description}</h5>
            <h3 className={s.quality}>SCORE: {product.score}⭐️</h3>
            <div className={s.scoreSubmit}> <Score></Score> </div>


          </div>
          <div>
            <img src={product.image} alt={product.image} className={s.img} />
            <div className={s.btncarrito}>
              <div className={s.carrBtns}>
                {/*  {productInCar ? ( */}
                <span className={s.btnDelete}>
                  <button
                    class="btn btn-dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteItemToCart(product);
                      // history.push('/shop')
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
                {/* ) : null} */}
                {/* {productInCar ? ( */}
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
              </div>
             
            </div>


            <div className={s.columna}>
              {/* <h3 className={s.score}>SCORE: { <Score score={product.score}/>}</h3> */}

              <div className={s.quantity}>
                <h3 className={s.price}>Price: $ {product.price}</h3>
                <br />
                {
                  productInCar ?
                    (
                      <h3 className={s.premiumBasic}>Quantity: <br />{productInCar.quantity}</h3>

                    ) : null
                }
              </div>



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
                <Link to="/cart">

                  <div className={s.button}>
                    <button

                      class="btn btn-dark"

                    >
                      BUY NOW
                    </button>
                  </div>
                </Link>
              ) : (
                ""
              )}

            </div>
          </div>



        </div>
        {/* <div className="" ><br />
       <h2 className={s.interested}>You may also be interested in... </h2>
       </div> */}

      </div>
      <br>
      </br>
      {/* <Carrusel/> */}




    </div>
  );
}
export default DetailProduct;