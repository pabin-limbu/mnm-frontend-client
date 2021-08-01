import React from "react";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import { Container } from "react-bootstrap";

function Banner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyload: 'ondemand',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    acciblity: false,
    arrows: true,
  };
  return (
    <Container fluid className="banner-container">
      <Slider {...settings}>
        <div>
          <img className="banner-img" src="/images/Banners/b1.jpg" alt="" />
        </div>
        <div>
          <img className="banner-img" src="/images/Banners/b2.png" alt="" />
        </div>
        <div>
          <img className="banner-img" src="/images/Banners/b3.jpg" alt="" />
        </div>
        <div>
          <img className="banner-img" src="/images/Banners/b4.jpg" alt="" />
        </div>
        <div>
          <img className="banner-img" src="/images/Banners/b5.jpg" alt="" />
        </div>
      </Slider>
    </Container>
  );
}

export default Banner;
