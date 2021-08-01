import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import Filternav from "../../components/FilterNav";
import "./style.css";

import getQueryParams from "../../utils/getQueryParams";
import ViewProductModal from "./viewProductModal";
import { addToCart } from "../../store/actions/cart.actions";

const ProductListPage = (props) => {
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState("");
  const [quickViewModalShow, setQuickViewModalShow] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproductBySlug(props.match.params.slug));
  }, []);

  const addProductToCart = (product) => {
    const { _id, name, price, quantity, productPictures } = product;
    console.log(product);
    console.log(_id, name, price, quantity, productPictures);
    dispatch(addToCart({ _id, name, price, quantity, productPictures }, 1));
  };

  const renderProductCard = () => {
    return (
      <Container
        fluid

        // className=" d-flex flex-row justify-content-center item-align-center flex-wrap"
      >
        <div className="nav-breadcrumb-container">asd/asd/asd</div>
        <Row>
          <Col
            style={{ height: "100vh" }}
            xs={0}
            sm={0}
            md={0}
            lg={2}
            className="aside-filter-nav"
          >
            <Filternav slug={props.match.params.slug}></Filternav>
          </Col>
          <Col xs={12} sm={12} md={12} lg={10}>
            <Row>
              {product.products.map((product, index) => {
                return (
                  <Col
                    lg={3}
                    md={4}
                    sm={4}
                    xs={6}
                    className=""
                    key={product.slug}
                  >
                    <Card className="p-2 mt-1">
                      <Card.Img
                        variant="top"
                        src={generatePublicUrl(product.productPictures[0].img)}
                      />

                      <Card.Body className="m-0 p-0">
                        <Button
                          className="btn-quick-view"
                          variant="info"
                          onClick={() => {
                            // console.log("quick card view");
                            // console.log(index);
                            // setShowOverlay("active");
                            // setQuickViewProduct(product);
                            // setQuickViewModalShow(true);
                            setQuickViewProduct(product);
                            setShowProductViewModal(true);
                          }}
                        >
                          View
                        </Button>

                        <Card.Text>{product.name}</Card.Text>
                        <Card.Text>RS: {product.price}</Card.Text>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary"
                            onClick={() => {
                              addProductToCart(product);
                            }}
                          >
                            Add to cart
                          </Button>{" "}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderQuickViewProduct = () => {
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "400px",
          zIndex: "100",
          position: "relative",
        }}
        onclick={(e) => {
          console.log(e.target);
        }}
      >
        <p>Quick view product.</p>
      </div>
    );
  };

  const renderProduct = () => {
    console.log({ props });
    const myParams = getQueryParams(props.location.search);
    console.log({ myParams });
  };
  const handleClose = () => {
    setShowProductViewModal(false);
  };

  return (
    <Layout>
      {renderProduct()}
      {renderProductCard()}
      {quickViewProduct ? (
        <ViewProductModal
          product={quickViewProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
        ></ViewProductModal>
      ) : null}
    </Layout>
  );
};

export default ProductListPage;
