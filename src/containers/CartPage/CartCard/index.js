import React, { useState, useEffect } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import { Card, Button, Col, Row, InputGroup, Form } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../store/actions";
import "./style.css";

function CartCard(props) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const item = props.item;
  const { incrementCartItem, decrementCartItem } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    setItemQuantity(item.qty);
    return () => {};
  }, [item]);

  // const increamentQuantity = (itemQuantity) => {
  //   setItemQuantity(itemQuantity + 1);
  // };
  // const decrementQuantity = (itemQuantity) => {
  //   setItemQuantity(itemQuantity - 1);
  // };
  return (
    <Card style={{ height: "8rem" }}>
      <Card.Body>
        <Row>
          <Col xs={4}>
            <span
              className="cart-card-close"
              onClick={() => {
                dispatch(removeCartItem(props.item));
              }}
            >
              <IoIosCloseCircleOutline size={23} />
            </span>
            <Card.Img
              variant="top"
              src={generatePublicUrl(item.productPictures[0].img)}
              height="75"
              width="15px"
              style={{ objectFit: "contain" }}
            />
          </Col>

          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <Card.Text>{item.name}</Card.Text>
              </Col>
              <Col xs={12}>
                <Card.Text>{`RS ${item.price}`}</Card.Text>
              </Col>
            </Row>
          </Col>

          <Col className="item-quantity-control" xs={4}>
            <InputGroup className="mb-3">
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={() => {
                  decrementCartItem(item);
                }}
                size="sm"
              >
                -
              </Button>

              <Form.Control
                size="sm"
                type="text"
                readOnly
                value={itemQuantity}
                style={{ textAlign: "center" }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  incrementCartItem(item);
                }}
                size="sm"
              >
                +
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CartCard;
