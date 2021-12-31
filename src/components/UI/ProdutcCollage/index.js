import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import ItemCards from "../Cards/ItemCards";
import "./style.css";

function ProductCollage(props) {
  const {
    carouselCategoryname,
    products,
    setShowProductViewModal,
    setCurrentProduct,
  } = props;
  return (
    <Container>
      <div>
        <div className="d-flex pt-4 justify-content-center">
          <h6
            className=" d-flex college-title-name align-items-center"
            style={{ width: "100%" }}
          >
            <b></b>
            <span>{carouselCategoryname} </span>
            <b></b>
          </h6>
        </div>

        <Row className="row-cols-lg-5">
          {products.length >= 0
            ? products.map((item) => {
                return (
                  <Col key={item.name} md={4} sm={4} xs={6} key={item._id}>
                    <ItemCards
                      setShowProductViewModal={setShowProductViewModal}
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    ></ItemCards>
                  </Col>
                );
              })
            : null}
        </Row>
        <div className="d-flex justify-content-center">
          <Button
            size="sm"
            variant="outline-warning"
            className="float-right mt-2"
          >
            {" "}
            view all{" "}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ProductCollage;
