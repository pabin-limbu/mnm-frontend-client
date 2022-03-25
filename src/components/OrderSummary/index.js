import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";

import OrderSummaryCartCard from "./OrderSummaryCartCard";

function OrderSummary({ setAllCartItems, allCartItems, subTotal, viewOnly }) {
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
    <div>
      {allCartItems &&
        Object.keys(allCartItems).map((key) => {
          {
            return (
              <OrderSummaryCartCard
                viewOnly
                key={key}
                item={allCartItems[key]}
                incrementCartItem={incrementCartItem}
                decrementCartItem={decrementCartItem}
              ></OrderSummaryCartCard>
            );
          }
        })}

      <Row>
        <Col className={`${viewOnly && "d-none"}`} sm={12}>
          <Form.Label>DISCOUNT CODE</Form.Label>
          <Form.Control type="text" placeholder="Coupen code" />
          <Button className="m-2" variant="warning" size="sm" className="">
            Apply coupon
          </Button>
        </Col>
        <Col sm={12}>
          <Form.Label>CART TOTALS</Form.Label>
        </Col>
        <Col sm={12} className="d-flex justify-content-between">
          <Form.Label>Subtotal</Form.Label>
          <Form.Label>${subTotal}</Form.Label>
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
      </Row>
    </div>
  );
}

export default OrderSummary;
