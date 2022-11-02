import React, { Component } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./detailCarru.css"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";



<source />


const items = 
[
    {
      id: 1,
      name: "Beard Balm",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_959303-MLA51602582272_092022-F.webp",
        altText: "Imagen 12",    
        caption: "",
    },
    {
      id: 2,
      name: "Mühle Razor Gillette® Fusion Vivo Series Plumtree",
      price: 5400,
      quality: "basic",
      stock: 52,
      image:
        "https://www.giftsandcare.com/12277-home_default_carousel/muehle-razor-gillette-fusion-vivo-series-plumtree.jpg",
        altText: "Imagen 11",    
        caption: "",
    },
    {
      id: 3,
      name: "Edwin Jagger Marfil",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg",
        altText: "Imagen 10",    
        caption: "",
    },
    {
      id: 4,
      name: "Brosh Super Hard Gel 200gr",
      price: 200,
      quality: "basic",
      stock: 5,
      image:
        "https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg",
        altText: "Imagen 9",    
        caption: "",
    },
    {
      id: 5,
      name: "Mühle Double Edge Safety Razor R89 Rose Gold Close Comb",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg",
        altText: "Imagen 8",    
        caption: "",
    },
    {
      id: 6,
      name: "Fatip Chrome Slant Double Edge Safety Razor",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg",
        altText: "Imagen 7",    
        caption: "",
    },
    {
      id: 7,
      name: "Omega Garnet Shaving Bowl",
      price: 200,
      quality: "basic",
      stock: 5,
      image:
        "https://www.giftsandcare.com/6329-large_default/brocha-de-afeitar-pelo-sintetico-roja-omega-s10018.jpg",
        altText: "Imagen 6",    
        caption: "",
    },
    {
      id: 8,
      name: "Fatip Piccolo Gold Slant Close Open Double Edge Safety Razor",
      price: 200,
      quality: "basic",
      stock: 5,
      image:
        "https://www.giftsandcare.com/16511-large_default/fatip-piccolo-gold-slant-close-open-double-edge-safety-razor.jpg",
        altText: "Imagen 5",    
        caption: "",
    },
    {
      id: 9,
      name: "Baxter of California Shave Tonic",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg",
        altText: "Imagen 5",    
        caption: "",
    },
    {
      id: 10,
      name: "Captain Fawcett Barberism Pre-Shave Oil 50ml",
      price: 300,
      quality: "basic",
      stock: 5,
      image:
        "https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg",
        altText: "Imagen 4",    
        caption: "",
    },
    {
      id: 11,
      name: "Hey Joe Pre Shave Oil 50ml",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg",
        altText: "Imagen 3",    
        caption: "",
    },
    {
      id: 12,
      name: "After Shave BeardLovers",
      price: 200,
      quality: "basic",
      stock: 5,
      image:
        "https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg",
        altText: "Imagen 2",    
        caption: "",
    },
    {
      id: 13,
      name: "Cella Milano Bio Aloe Vera After Shave Balm 100ml",
      price: 200,
      quality: "premium",
      stock: 5,
      image:
        "https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg",
        altText: "Imagen 1",    
        caption: "",
    },
  ];


/* [
  {
    src: "https://images-ext-1.discordapp.net/external/IHmjbdPQ1srrMct2wEIsWndgH8zBYkVzP4jgKXbqZoM/%3Fcs%3Dsrgb%26dl%3Dpexels-cottonbro-3998425.jpg%26fm%3Djpg/https/images.pexels.com/photos/3998425/pexels-photo-3998425.jpeg?width=396&height=594",
    altText: "Imagen 1",
    caption: "",

  },
  {
    src: "https://images-ext-2.discordapp.net/external/aRgQroxSYDekLnL_FNcaYmNcbVRbxKk3a3m9v5t7KVI/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D1260%26h%3D750%26dpr%3D1/https/images.pexels.com/photos/3993470/pexels-photo-3993470.jpeg?width=396&height=594",
    altText: "Imagen 2",
    caption: "",
  },
  {
    src: "https://images-ext-1.discordapp.net/external/y5Rvako0Wa_cluT9a7qOqiMPsdCFqDOgm5KYGco9Ing/%3Fauto%3Dcompress%26cs%3Dtinysrgb%26w%3D600%26lazy%3Dload/https/images.pexels.com/photos/9992817/pexels-photo-9992817.jpeg?width=396&height=594",
    altText: "Imagen 3",
    caption: "",
  },
]; */

class Carrusel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item}
        >
          <div className="detCarrContainer">
            <a href={`/product/${item.id}`}>
              
          <img src={item.image} alt={item.altText} with="50%" height="250px" />
            </a>
          <h3 >{item.name}</h3>
          <h4 >${item.price}</h4>
          <h5 >Quality: {item.quality}</h5>
          </div>
          
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}
export default Carrusel;