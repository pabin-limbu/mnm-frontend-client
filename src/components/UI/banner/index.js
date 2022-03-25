import React from "react";
import Slider from "react-slick";
import "./style.css";
import { Container } from "react-bootstrap";
import { generatePublicUrl } from "../../../urlConfig";

function Banner({ bannerList }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyload: "ondemand",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    acciblity: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Container className="banner-container">
      <Slider className="banner-slider" {...settings}>
        {bannerList && bannerList.length > 0
          ? bannerList.map((banner) => {
              return (
                <div key={banner._id} className="img-container">
                  <img
                    className="banner-img"
                    src={generatePublicUrl(banner.bannerImage)}
                    alt=""
                  />
                </div>
              );
            })
          : null}
      </Slider>
    </Container>
  );
}

export default Banner;
