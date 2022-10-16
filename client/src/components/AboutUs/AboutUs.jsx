import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div>
     {/*  <p>We are a hairdresser with a strong reputation among people.</p>
      <p>Since it was created we try to have customers as a priority.</p> */}
      <p>So..  who we are?</p>
      <br></br>
      <br></br>
      <p>Do you own a hair salon? Are you facing any issue to communicate or maintain a seamless customer relationship after COVID effects? One more question, were you able to generate enough revenue from your salon during the pandemic?</p>   
      <p> This platform is an amazing beauty and grooming marketplace which connects the clients to the barber professionals of their choice. </p>
      <p>Not only eases the way customers get beauty services but also allow the salon owners to target a huge segment of the market.</p>
      <p> Besides that, you can reach a new audience with the help of an online platform. During this pandemic time, people got more comfortable with the online services, therefore by digitizing your salon, you can achieve your estimated goal easily.</p>
      <p>Developing a software for a hair salon is one of the best ways to increase the revenue in this world of digitalization.</p>
      <p> You can also buy hair's products and pay them threw this website's personal ecommerce.</p>
      <p> In short, the timings and services are being planned by the customers at their preferences. </p>
      <p> The online destination to get the most professional beauty services from the top profesionals in the market.</p>
      <p>So, now you might be clear on why you need this software for the saloon.</p>
      <p> Follow simple steps like a book, pay, tip and rebook.</p>
      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <div>
          <h4>Contact us</h4>
        </div>
        {/* * * * * * * COMPLETAR LOS MAILS Y NOMBRES DE CADA UNO * * * * * * * *  */}
        <Link to="mail">Barbara Noriega</Link>
        <br></br>
        <Link to="mail">Yeiber Reyes</Link>
        <br></br>
        <Link to="mail">FedeSaffo</Link>
        <br></br>
        <Link to="mail">Fabri</Link>
        <br></br>
        <Link to="mail">Martin Horo</Link>
        <br></br>
        <Link to="mail">Alejandro Diez</Link> 
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
