import React, { useState, useEffect } from "react";
import "./style.css";
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

function ProductViewModal(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { show, handleClose, product, size } = props;
  const dispatch = useDispatch();
  //console.log(product);

  useEffect(() => {
    product && setTotalPrice(product.price * quantity);
    return () => {
      console.log("cleaning up");
      setTotalPrice(null);
    };
  }, [quantity]);

  const increamentQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity == 0) return;
    setQuantity(quantity - 1);
  };

  const addProductToCart = (product, newQnt = 0) => {
    handleClose();
    const { _id, name, price, quantity, productPictures } = product;
    dispatch(
      addToCart({ _id, name, price, quantity, productPictures }, newQnt)
    );
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
                    <Col sm={12}>{product.name}</Col>
                    <Col sm={12}>{product.price}</Col>
                    <Col sm={12}>{product.description}</Col>
                    <Col sm={12}>
                      <p>size: small</p>
                    </Col>
                    <Col sm={12}>
                      <Row>
                        <Col sm={6}>
                          <p>$ {totalPrice}</p>
                        </Col>
                        <Col sm={6}>
                          <a
                            href="#"
                            onClick={() => {
                              setQuantity(0);
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
                                  value={quantity}
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
                            <div className="btn-addToCart ml-3">
                              <Button
                                onClick={() => {
                                  addProductToCart(product, quantity);
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
                      <p>Category and tags</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            {/* {JSON.stringify(product)} */}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ProductViewModal;
