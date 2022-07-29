import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import ItemCards from "../../components/UI/Cards/ItemCards";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Filternav from "../../components/FilterNav";
import { addToCart } from "../../store/actions/cart.actions";
import ProductViewModal from "../../components/UI/modal/productViewModal";
import Toastmessage from "../../components/UI/ToastMessage";
import "./style.css";
const ProductListPage = (props) => {
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProducts, setCurrentProducts] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.slug === "featured") {
      setCurrentProducts(product.featuredProduct);
    }
    if (props.match.params.slug !== "featured") {
      console.log("prop name " + props.match.params.slug);
      dispatch(getproductBySlug(props.match.params.slug));
    }
  }, [props.match.params.slug]);

  useEffect(() => {
    if (props.match.params.slug !== "featured") {
      setCurrentProducts(product.products);
    }
  }, [product.products]);

  const addProductToCart = (product) => {
    const { _id, name, price, quantity, productPictures } = product;
    dispatch(addToCart({ _id, name, price, quantity, productPictures }, 1));
  };

  const toggleShowToast = () => setShowToast(!showToast);

  const renderProductCard = () => {
    return (
      <Container fluid>
        <Toastmessage
          show={showToast}
          onClose={toggleShowToast}
          delay={2000}
        ></Toastmessage>
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
          {/* filter nav */}
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
            <Row className="row-cols-lg-5">
              {currentProducts &&
                currentProducts.map((product) => {
                  return (
                    <Col xs={6} sm={4} md={3} key={product.slug}>
                      <ItemCards
                        setShowProductViewModal={setShowProductViewModal}
                        setCurrentProduct={setCurrentProduct}
                        item={product}
                        setShowToast={setShowToast}
                      ></ItemCards>
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };

  const handleClose = () => {
    setShowProductViewModal(false);
  };


  return (
    <Layout>
      {renderProductCard()}
      {currentProduct ? (
        <ProductViewModal
          product={currentProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
          setShowToast={setShowToast}
        ></ProductViewModal>
      ) : null}
    </Layout>
  );
};

export default ProductListPage;
