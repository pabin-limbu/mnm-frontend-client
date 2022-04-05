import React, { useState } from "react";
import Slider from "react-slick";
import "./style.css";
import { Card, Container } from "react-bootstrap";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

function Banner({ bannerList }) {
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const [currentItemIndex2, setcurrentItemIndex2] = useState(0);

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
    beforeChange: (current, next) => {
      setcurrentItemIndex(next);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
                <div
                  key={banner._id}
                  className="img-container"
                  onClick={() => {}}
                >
                  <Link
                    to={
                      bannerList[currentItemIndex].linkType == "category"
                        ? `/${bannerList[currentItemIndex].slug}`
                        : `/${bannerList[currentItemIndex].category.slug}/${bannerList[currentItemIndex].slugId}`
                    }
                  >
                    <Card.Img
                      variant="top"
                      src={generatePublicUrl(banner.bannerImage)}
                    />
                  </Link>
                </div>
              );
            })
          : null}
      </Slider>
    </Container>
  );
}

export default Banner;
