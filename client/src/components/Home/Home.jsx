import React, {useContext, useEffect} from "react"
import { Link } from "react-router-dom";
import Carrusel from "../carrusel/carrusel";
import styles from "./Home.module.css";
import { Button } from "reactstrap";
import HomeNavBar from "../HomeNavBar/HomeNavBar";
import { CartContext } from "../Shopping/ShoppingCart";
import {
  getDBUser,
  getDBCart,
} from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux'



export default function Home() {

  const { userId } = useContext(CartContext)
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)

  console.log('soy user antes', user)



    useEffect(() => {
      if (userId) {
        dispatch(getDBUser(userId))
        dispatch(getDBCart(userId))
        }
    }, []);
  

  // if(userId) {
  //   // getDBCart(userId)
  //   // getDBUser(userId)
  //   dispatch(getDBUser(userId))
  //   dispatch(getDBCart(userId))
  // }

  
  return (
    <div className={styles.background}>
      {/* user={{name: 'holi'}} */}
      <HomeNavBar user={user}/>
      <div className={styles.title}><h1>BARBER 'S APP</h1>
    
      <Carrusel /><br /></div>
  
      <div className={styles.buttonLinks}>

        <Button color="dark"><Link className={styles.button} to=""> {" "} Services{" "}  </Link></Button>
        <Button color="dark"> <Link className={styles.button} to="/AboutUs">    {" "}  Developers </Link> </Button>
        <Button color="dark"><Link className={styles.button} to="/shop"> Shop </Link> </Button>
        {/* <Button color="dark"><Link className={styles.button} to="/register"> Create an Account!</Link></Button> */}
        {/* <Button color="dark"><Link className={styles.button} to="/login">Sign in!</Link> </Button> */}


      </div><br />
    
      <h3>  Check our Ecommerce! <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-heart-fill" viewBox="0 0 16 16">
  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
</svg></h3>
    
     
    </div>
  );
}