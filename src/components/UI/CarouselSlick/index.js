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
    featured,
    carouselCategorySlug,
    setShowToast,
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

  const onHandleViewAll = () => {
    if (featured) {
      props.history.push(`/featured`, { state: "pabin" });
    } else {
      props.history.push(`/${carouselCategorySlug}`);
    }
  };
  return (
    <Container id="carouselSlick">
      <div className="d-flex justify-content-between mt-4">
        <h4 className="d-block carousel-title-name">
          {" "}
          {carouselCategoryname}{" "}
        </h4>
        <Button
          size="sm"
          variant="outline-warning"
          className="d-block"
          onClick={() => {
            onHandleViewAll();
          }}
        >
          {" "}
          view all{" "}
        </Button>
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
                    setShowToast={setShowToast}
                  ></ItemCards>
                </div>
              );
            })
          : null}
      </Slider>
    </Container>
  );
}

export default CarouselSlick;
