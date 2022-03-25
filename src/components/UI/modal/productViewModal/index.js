import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { generatePublicUrl } from "../../../../urlConfig";
import { addToCart } from "../../../../store/actions/cart.actions";
import { useDispatch } from "react-redux";
import "./style.css";

function ProductViewModal(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { show, handleClose, product, size, setShowToast } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    product && setTotalPrice(product.price * orderQuantity);
  }, [orderQuantity]);

  // useEffect(() => {
  //   setQuantity(1);
  // }, [show]);

  const increamentQuantity = () => {
    if (orderQuantity >= product.quantity) return;
    setOrderQuantity(orderQuantity + 1);
  };
  const decrementQuantity = () => {
    if (orderQuantity === 1) return;
    setOrderQuantity(orderQuantity - 1);
  };

  const addProductToCart = (product, orderQuantity) => {
    handleClose();
    const { _id, name, price, quantity, productPictures } = product;
    dispatch(
      addToCart({ _id, name, price, quantity, productPictures }, orderQuantity)
    ).then(() => {
      setShowToast(true);
    });
  };

  return (
    <>
      {product && (
        <Modal size={size} show={show} onHide={handleClose}>
          <Modal.Header className="d-md-none" closeButton></Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <Image
                    src={generatePublicUrl(product.productPictures[0].img)}
                    fluid
                  />
                </Col>
                <Col>
                  <Row>
                    <Col sm={12}>
                      <p className="productmodal-name">
                        {" "}
                        {product.name} Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit. Exercitationem, temporibus!{" "}
                      </p>
                    </Col>
                    <Col sm={12}>
                      <p>
                        <del>rs:20</del> <strong>rs:{product.price}</strong>{" "}
                      </p>
                    </Col>
                    <Col sm={12}>
                      {" "}
                      <p>
                        {product.description} Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Quam, sit! Cum, omnis
                        deleniti? Officiis tenetur officia, voluptates illo
                        corporis earum?{" "}
                      </p>{" "}
                    </Col>
                    <Col sm={12}>
                      <p className="productmodal-stock">
                        item in stock : {product.quantity}
                      </p>
                    </Col>
                    <Col sm={12}>
                      <Row>
                        <Col sm={9}>
                          <p>Total price : rs {totalPrice}</p>
                        </Col>
                        <Col sm={3}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOrderQuantity(1);
                            }}
                          >
                            RESET
                          </a>
                        </Col>
                        <Col sm={12}>
                          <div
                            className="quantitySelectionArea"
                            style={{ display: "flex" }}
                          >
                            <div
                              className="inputQuantityArea"
                              style={{ width: "120px" }}
                            >
                              <InputGroup className="mb-3">
                                <Button
                                  variant="outline-secondary"
                                  id="button-addon1"
                                  onClick={decrementQuantity}
                                >
                                  -
                                </Button>
                                <FormControl
                                  aria-label="Example text with button addon"
                                  aria-describedby="basic-addon1"
                                  readOnly
                                  value={orderQuantity}
                                />
                                <Button
                                  variant="outline-secondary"
                                  id="button-addon2"
                                  onClick={increamentQuantity}
                                >
                                  +
                                </Button>
                              </InputGroup>
                            </div>
                            <div className="addtocartbtn-container">
                              <Button
                                className="btn-addtocart"
                                
                                onClick={() => {
                                  addProductToCart(product, orderQuantity);
                                }}
                              >
                                ADD TO CART
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12}>
                      <p>category : {product.category.slug}</p>
                      {/* <p>{JSON.stringify(product)}</p>
                      <p>{product.quantity}</p> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProductViewModal;
//NOTE:
//This is a react bootstrap model component and it has its own overlay.
