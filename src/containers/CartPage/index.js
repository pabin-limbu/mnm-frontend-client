import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import { Row, Col, Button, Form, Container } from "react-bootstrap";

import "./style.css";

function CartPage() {
  const [allCartItems, setAllCartItems] = useState();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const items = cartItems.cartItems;
    setAllCartItems(items);
  }, [cartItems]);

  const showItemsInCart = () => {
    console.log("hi");
  };

  const incrementCartItem = (item) => {
    const incrementedQty = item.qty + 1;
    setAllCartItems({
      ...allCartItems,
      [item._id]: { ...item, qty: incrementedQty },
    });
  };
  const decrementCartItem = (item) => {
    const decrementQuantity = item.qty - 1;
    setAllCartItems({
      ...allCartItems,
      [item._id]: { ...item, qty: decrementQuantity },
    });
  };

  return (
    <Layout>
      <div className="test-123">
        <p>INFO SECTION</p>
      </div>
      <Container>
        <Row>
          <Col sm={8}>
            <div>
              {allCartItems &&
                Object.keys(allCartItems).map((key) => {
                  return (
                    <CartCard
                      key={key}
                      item={allCartItems[key]}
                      incrementCartItem={incrementCartItem}
                      decrementCartItem={decrementCartItem}
                    ></CartCard>
                  );
                })}
            </div>
            <Row>
              <Col xs={7}>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className=""
                  onClick={showItemsInCart}
                  block
                >
                  Continue shopping
                </Button>
              </Col>
              <Col xs={5}>
                <Button
                  variant="info"
                  size="sm"
                  className=""
                  block
                  onClick={showItemsInCart}
                >
                  update cart
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <div className="cart-summary-sticky">
              <Row>
                <Col sm={12}>
                  <Form.Label>CART TOTALS</Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>Subtotal</Form.Label>
                  <Form.Label>$123</Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>Shipping</Form.Label>
                  <Form.Label className="" style={{ textAlign: "right" }}>
                    Shhiping option will be updated during checkout
                  </Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>TOTAL</Form.Label>
                  <Form.Label>$123</Form.Label>
                </Col>

                <Col sm={12}>
                  <Button
                    className="m-2"
                    variant="dark"
                    size="sm"
                    className=""
                    block
                  >
                    Proceed Checkout
                  </Button>
                </Col>

                <Col sm={12}>
                  <Form.Label>DISCOUNT CODE</Form.Label>
                  <Form.Control type="text" placeholder="Coupen code" />
                  <Button
                    className="m-2"
                    variant="warning"
                    size="sm"
                    className=""
                    block
                  >
                    Apply coupon
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CartPage;
