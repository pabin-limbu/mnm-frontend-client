import React from "react";
import { Card, Button } from "react-bootstrap";

function ItemCards() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="/images/absolutevodka.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>price</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ItemCards;
