import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.background}> 
      <div className={styles.card}>
        

        <div className={styles.git}>
     <h1 className={styles.title}>Our History</h1>


        <div className="texto"><br />


          <h3 className={styles.fontText}> It all started in the city of Rosario, a barber's chair, 
          a razor, and the intrigue of knowing what had happened to the traditional barber shops of yesteryear; 
          at that time (year 2008) there was not the boom that we know today.
In 2015 we decided to take the final step and transform ourselves into barbers, 
barbershops and hairdressers, providing traditional and contemporary cutting and 
shaving services and adding services and professionals over time, creating a unique 
space where image care, good service and enjoyment of the stay are characteristic.
            

              </h3>

            </div>
        </div>
      </div>
    </div>
  );
}