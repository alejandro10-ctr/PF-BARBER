import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h1 className={styles.title}>Developers</h1>

        <div className={styles.git}>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/Yeiberey"

          >
            Yeyber Reyes
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/brbnoriega"

          >
            Barbara Noriega
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/HORO98"

          >
            Martin Horodeski
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/AlejandroDiez"

          >
            Alejandro Diez
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/FedeSaffores"

          >
            Federico Saffores
          </a>
          <br />
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/fbrz1"

          >
            Fabrizio Alderete
          </a>
          <br />
        </div>
        <div className="texto"><br />


          <h3 className={styles.fontText}>  This platform is an amazing beauty and grooming marketplace which
            connects the clients to the barber professionals of their choice.{" "}

            Developing a software for a hair salon is one of the best ways to
            increase the revenue in this world of digitalization.   </h3>

        </div>
      </div>
    </div>
  );
}