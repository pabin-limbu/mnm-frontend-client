import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { getOrderById } from "../../store/actions";
import "./style.css";

function SuccessCheckoutSummary(props) {
  const [order, setorder] = useState({});
  const dispatch = useDispatch();
  const { search } = useLocation();

  const orderState = useSelector((state) => state.order.order);

  useEffect(() => {
    dispatch(getOrderById(new URLSearchParams(search).get("oid")));
  }, []);

  useEffect(() => {
    console.log(orderState);
    setorder(orderState.order);
  }, [orderState]);

  const renderIteminTable = (items) => {
    const mapItems = items.map((item) => {
      return (
        <tr key={item._id}>
          <td>{`${item.name}  x ${item.purchasedQty}`}</td>
          <td>{item.payablePrice * item.purchasedQty}</td>
        </tr>
      );
    });
    return mapItems;
  };

  const handleContinuwShop = () => {
    props.history.push("/");
  };

  return (
    <div>
      <Layout>
        <Container>
          <Row>
            <Col xs={12}>
              <Alert variant="success">
                <p>Thank you your order has been placed successfully.</p>
              </Alert>
            </Col>
            <Col xs={12} md={6}>
              <div className="order-details">
                <h4>Order details</h4>
                <table className="item-table">
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                    {order &&
                      Object.keys(order).length > 0 &&
                      renderIteminTable(order.items)}
                    <tr>
                      <td>Delivery fee </td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Payment </td>
                      <td>{order && order.paymentType}</td>
                    </tr>
                    <tr>
                      <td>TOTAL</td>
                      <td> {order && order.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="order-detail-summary">
                <ul>
                  <li>
                    <p>
                      order number: <span>{order && order.orderId}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Total: <span>{order && order.totalAmount}</span>{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      order date:{" "}
                      <span>
                        {order &&
                          new Date(order.createdAt).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Payment: <span>{order && order.paymentType}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                className={`btnContinuwShop  w-100`}
                size="sm"
                variant="outline-secondary"
                onClick={handleContinuwShop}
              >
                continue shopping
              </Button>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default SuccessCheckoutSummary;
