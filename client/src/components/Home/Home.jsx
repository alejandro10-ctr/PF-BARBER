import React from "react";
import Carrusel from "../carrusel/carrusel";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <div className="titulo">
        <img
          src="https://w7.pngwing.com/pngs/139/83/png-transparent-scissors-angle-technic-scissors.png"
          className="tijeraImgen"
        ></img>
        <h1>BARBER 'S APP</h1>
      </div>
      <Carrusel />
      <br />
      <br />
      <br />
      <Link className="btn" to="/AboutUs">
        ABOUT US
      </Link>
      <Link className="btn" to="">
        SERVICES
      </Link>
      <Link className="btn" to="/shop">
        PRODUCT
      </Link>
      <Link className="btn" to="">
        SING UP
      </Link>
      <Link className="btn" to="">
        CREATE ACCOUNT
      </Link>
      <br />
      <br />
      <br />
      <h3>PAGA CON MERCADO DE PAGO</h3>
      <img
        src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/718/448/products/d_738371-mla49316492518_032022-f1-ed4272fc0b58b093aa16519683623243-640-0.jpg"
        width="100"
        height="100"
        alt="Mercado de Pago"
      ></img>
      <br />
      <br />
    </div>
  );
}