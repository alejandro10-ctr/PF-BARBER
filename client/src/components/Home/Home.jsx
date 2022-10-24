import React from "react"
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
    
      <h3>  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="white" className="bi bi-credit-card" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
</svg> You could Pay with MercadoPago <svg xmlns="http://www.w3.org/2000/svg" width="36" height="26" fill="white" className="bi bi-credit-card" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
</svg></h3>
    
     
    </div>
  );
}