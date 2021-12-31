import React from "react";
import { Card, Button } from "react-bootstrap";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";

function ItemCards(props) {
  const { item, setCurrentProduct, setShowProductViewModal } = props;
  return (
    <Card>
      <Card.Img
        variant="top"
        src={generatePublicUrl(item.productPictures[0].img)}
      />
      <div className="btn-quickView-container">
        <Button
          variant="info"
          size="sm"
          className="btn-quickView shadow-none"
          onClick={() => {
            setCurrentProduct(item);
            setShowProductViewModal(true);
          }}
        >
          View
        </Button>
      </div>
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title as="h6">{item.name}</Card.Title>
        <Card.Text>NPR: {item.price}</Card.Text>
        <Button className="btn-addToCart" size="sm" variant="secondary">
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ItemCards;
