import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { Row, Col, Button, Form, Container, Alert } from "react-bootstrap";
import { updateCartQuantity } from "../../store/actions";

import "./style.css";

function CartPage(props) {
  const [allCartItems, setAllCartItems] = useState();
  const cartItems = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const items = cartItems.cartItems;
    setAllCartItems(items);
  }, [cartItems]);

  const handleUpdateCartQuantity = () => {
    dispatch(updateCartQuantity(allCartItems)).then(() => {
      setShow(true);
    });
  };

  const incrementCartItem = (item) => {
    const incrementedQty = item.qty + 1;
    if (incrementedQty >= item.quantity + 1) {
      console.log("max quantity reahed");
      return;
    }
    setAllCartItems({
      ...allCartItems,
      [item._id]: { ...item, qty: incrementedQty },
    });
  };
  const decrementCartItem = (item) => {
    const decrementQuantity = item.qty - 1;
    if (decrementQuantity <= 0) {
      console.log("min quantity reached");
      return;
    }
    setAllCartItems({
      ...allCartItems,
      [item._id]: { ...item, qty: decrementQuantity },
    });
  };

  //item subtotal.
  function calculateSubTotal(allCartItems) {
    // console.log(allCartItems);
    let totalsum = 0;
    Object.keys(allCartItems).forEach((item, index) => {
      //item overall price depend on quantity.
      let itemTotalPriceIncQnt =
        allCartItems[item].price * allCartItems[item].qty;
      totalsum = totalsum + itemTotalPriceIncQnt;
    });
    // setSubTotal(totalsum);
    return totalsum;
  }

  return (
    <Layout>
      <div className="cartpage-alert-container">
        <Alert
          variant="success"
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>cart updated ✓</Alert.Heading>
        </Alert>
      </div>
      <Container>
        <Row>
          <Col sm={8}>
            <div>
              {allCartItems &&
                Object.keys(allCartItems).map((key) => {
                  {
                    return (
                      <CartCard
                        key={key}
                        item={allCartItems[key]}
                        incrementCartItem={incrementCartItem}
                        decrementCartItem={decrementCartItem}
                      ></CartCard>
                    );
                  }
                })}
            </div>
            <Row>
              <Col xs={7}>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="btn-continueShopping"
                  onClick={() => {
                    props.history.push("/");
                  }}
                >
                  &#8592; Continue shopping
                </Button>
              </Col>
              <Col xs={5}>
                <Button
                  variant="info"
                  size="sm"
                  className="btn-updatecart"
                  onClick={handleUpdateCartQuantity}
                >
                  update cart
                </Button>
              </Col>
            </Row>
          </Col>
          {/* ok */}
          <Col sm={4}>
            <div className="cart-summary-sticky">
              <Row>
                <Col sm={12}>
                  <Form.Label>CART TOTALS</Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>Subtotal</Form.Label>
                  <Form.Label>
                    rs: {calculateSubTotal(cartItems.cartItems)}
                  </Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>Shipping</Form.Label>
                  <Form.Label className="" style={{ textAlign: "right" }}>
                    Shhiping option will be updated during checkout
                  </Form.Label>
                </Col>
                <Col sm={12} className="d-flex justify-content-between">
                  <Form.Label>TOTAL</Form.Label>
                  <Form.Label>
                    rs: {calculateSubTotal(cartItems.cartItems)}
                  </Form.Label>
                </Col>

                <Col sm={12}>
                  <Button
                    className="m-2"
                    variant="dark"
                    size="sm"
                    className="btn-proceedcheckout"
                    onClick={() => {
                      props.history.push("./checkout");
                    }}
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
