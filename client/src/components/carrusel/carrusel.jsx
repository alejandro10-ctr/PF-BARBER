import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

<source />;
const items = [
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
];

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
          key={item.src}
        >
          <img src={item.src} alt={item.altText} with="50%" height="500px" />
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
