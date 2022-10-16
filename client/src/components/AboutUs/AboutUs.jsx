import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function AboutUs() {
  return (
        <div>
          <h1 className="TITLE">ABOUT US</h1>
          <div className="TarGitHub">
            <br />
            <h3>DEVELOPERS GITHUB</h3>
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/Yeiberey"
              className="Target"
            >
              YEIBER
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/brbnoriega"
              className="Target"
            >
              BARBI
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/HORO98"
              className="Target"
            >
              MARTIN
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/AlejandroDiez"
              className="Target"
            >
              ALEJANDRO
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/FedeSaffores"
              className="Target"
            >
              FEDE
            </a>
            <br />
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/fbrz1"
              className="Target"
            >
              FABRI
            </a>
            <br />
          </div>
          <div className="texto">
        <p>
          Do you own a hair salon? Are you facing any issue to communicate or
          maintain a seamless customer relationship after COVID effects? One
          more question, were you able to generate enough revenue from your
          salon during the pandemic?
        </p>
        <p>
          {" "}
          This platform is an amazing beauty and grooming marketplace which
          connects the clients to the barber professionals of their choice.{" "}
        </p>
        <p>
          Not only eases the way customers get beauty services but also allow
          the salon owners to target a huge segment of the market.
        </p>
        <p>
          {" "}
          Besides that, you can reach a new audience with the help of an online
          platform. During this pandemic time, people got more comfortable with
          the online services, therefore by digitizing your salon, you can
          achieve your estimated goal easily.
        </p>
        <p>
          Developing a software for a hair salon is one of the best ways to
          increase the revenue in this world of digitalization.
        </p>
        <p>
          {" "}
          You can also buy hair's products and pay them threw this website's
          personal ecommerce.
        </p>
        <p>
          {" "}
          In short, the timings and services are being planned by the customers
          at their preferences.{" "}
        </p>
        <p>
          {" "}
          The online destination to get the most professional beauty services
          from the top profesionals in the market.
        </p>
        <p>
          So, now you might be clear on why you need this software for the
          saloon.
        </p>
        <p> Follow simple steps like a book, pay, tip and rebook.</p>
      </div>
    </div>
  ); 
      }