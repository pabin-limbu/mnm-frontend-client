import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import { Card, Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import Filternav from "../../components/FilterNav";
import "./style.css";

import getQueryParams from "../../utils/getQueryParams";
import ViewProductModal from "./viewProductModal";
//import ViewProductModal from "../../components/UI/modal/viewProductModal";
import { addToCart } from "../../store/actions/cart.actions";
import TextModal from "../../components/UI/modal/testModal";
import ProductViewModal from "../../components/UI/modal/productViewModal";
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
    //console.log(product);
    // console.log(_id, name, price, quantity, productPictures);
    dispatch(addToCart({ _id, name, price, quantity, productPictures }, 1));
  };

  const renderProductCard = () => {
    return (
      <Container
        fluid

        // className=" d-flex flex-row justify-content-center item-align-center flex-wrap"
      >
        <Row className="nav-breadcrumb-container mb-2">
          <Col>
            <div className="breadcrumb">
              <span>
                <a href="#">home</a>
              </span>
              <span className="divider">/</span>
              <span>
                <a href="#">spirit</a>
              </span>
              <span className="divider">/</span>
              <span>
                <a href="#">vodka</a>
              </span>
            </div>
          </Col>
          <Col className="d-none d-md-flex align-items-center justify-content-end">
            <div className="orderby">
              <Dropdown align="end">
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                >
                  DISPLAY ITEM BY
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">LOW TO HIGH</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">HIGH TO LOW</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">ALPHABET</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
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
              <Col>info</Col>
            </Row>

            <Row className="row-cols-lg-5">
              {product.products.map((product, index) => {
                return (
                  <Col xs={6} sm={4} md={3} key={product.slug}>
                    <Card className="p-2 mt-1">
                      <Card.Img
                        variant="top"
                        src={generatePublicUrl(product.productPictures[0].img)}
                      />
                      <div className="product-page-btn-qickview-container">
                        <Button
                          className="btn-quick-view shadow-none"
                          variant="info"
                          size="sm"
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
                      </div>
                      <Card.Body className="m-0 p-0">
                        <Card.Text as="h6">{product.name}</Card.Text>
                        <Card.Text className="card-text-price">
                          RS: {product.price}
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                          <Button
                            className="btn-addtocart"
                            variant="primary"
                            size="sm"
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
    //console.log({ props });
    const myParams = getQueryParams(props.location.search);
    // console.log({ myParams });
  };
  const handleClose = () => {
    setShowProductViewModal(false);
  };

  return (
    <Layout>
      {renderProduct()}
      {renderProductCard()}
      {quickViewProduct ? (
        <ProductViewModal
          product={quickViewProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
        ></ProductViewModal>
      ) : null}
      <TextModal></TextModal>
    </Layout>
  );
};

export default ProductListPage;
