import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "./style.css";

function CommentCarouusel({ commentList }) {
  const comments = [
    {
      comment:
        "I am verry happy with the fast and relaiable service of midnight madira, anytime i wish to cheers myself Midnight madira comes to my mind",
      user: "arun",
    },
    {
      comment:
        "Best ever liquor store with geniun product, love midnight madira",
      user: "saroj",
    },
    {
      comment:
        " I wonder if there is a margarita somewhere out there thinking about me, too. alwas madira",
      user: "anjal",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyload: "ondemand",
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    acciblity: false,
    arrows: true,
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
    <Container fluid className="comment-carouselSlick">
      <div className="comment-headercontainer d-flex justify-content-center flex-column align-items-center">
        <p id="comment-header">Happy customer</p>
      </div>
      <Slider className="comment-slider" {...settings}>
        {commentList.length >= 0
          ? commentList.map((item, index) => {
              return (
                <Row key={index}>
                  <Col xs={12} className="comment-maincontainer">
                    <q className="comment-main">{item.comment}</q>
                  </Col>
                  <Col xs={12} className="d-flex justify-content-center ">
                    <h6 id="comment-footer">- {item.commenter}</h6>
                  </Col>
                </Row>
              );
            })
          : null}
      </Slider>
    </Container>
  );
}

export default CommentCarouusel;
