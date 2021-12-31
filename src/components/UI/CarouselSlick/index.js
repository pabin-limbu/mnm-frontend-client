import React from "react";
import { Button, Container } from "react-bootstrap";
import Slider from "react-slick";
import ItemCards from "../Cards/ItemCards";
import "./style.css";

function CarouselSlick(props) {
  const {
    carouselCategoryname,
    products,
    setCurrentProduct,
    setShowProductViewModal,
  } = props;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,

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
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Container id="carouselSlick">
      <div>
        <div className="clearfix mb-2" >
          <Button
            size="sm"
            variant="outline-warning"
            className="float-right mt-2"
          >
            {" "}
            view all{" "}
          </Button>
          <h6 className="float-left mt-4 carousel-title-name">
            {" "}
            {carouselCategoryname}{" "}
          </h6>
        </div>

        <Slider className="carousel-slider" {...settings}>
          {products.length >= 0
            ? products.map((item) => {
                return (
                  <div key={item._id} style={{ width: "226 px" }}>
                    <ItemCards
                      setShowProductViewModal={setShowProductViewModal}
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    ></ItemCards>
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
    </Container>
  );
}

export default CarouselSlick;
