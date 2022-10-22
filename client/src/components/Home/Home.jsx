import React from "react";
import { Link } from "react-router-dom";
import Carrusel from "../carrusel/carrusel";
import styles from "./Home.module.css";
import { Button } from "reactstrap";
export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.title}><h1>BARBER 'S APP</h1>
    
      <Carrusel /><br /></div>
  
      <div className={styles.buttonLinks}>

        <Button color="dark"><Link className={styles.button} to=""> {" "} Services{" "}  </Link></Button>
        <Button color="dark"> <Link className={styles.button} to="/AboutUs">    {" "}  Developers </Link> </Button>
        <Button color="dark"><Link className={styles.button} to="/shop"> Shop </Link> </Button>
        <Button color="dark"><Link className={styles.button} to="/register"> Create an Account!</Link></Button>
        <Button color="dark"><Link className={styles.button} to="/login">Sign in!</Link> </Button>


      </div><br />

      <h3>You could Pay with MercadoPago</h3>
      {/* <img
        src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/718/448/products/d_738371-mla49316492518_032022-f1-ed4272fc0b58b093aa16519683623243-640-0.jpg"
        width="100"
        height="100"
        alt="Mercado de Pago"
      ></img> */}
     
    </div>
  );
}