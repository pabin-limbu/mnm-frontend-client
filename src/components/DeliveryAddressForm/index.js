import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function DeliveryAddressForm() {
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="userFname">
              <Form.Control type="text" placeholder="Frst name *" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="userLname">
              <Form.Control type="text" placeholder="last name *" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="userAddress">
              <Form.Control as="textarea" rows={3} placeholder="Address *" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="userPhone">
              <Form.Control type="number" placeholder="Phone number *" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Control type="email" placeholder=" email *" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default DeliveryAddressForm;
