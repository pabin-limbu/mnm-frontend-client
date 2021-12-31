import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./style.css";

const MaterialInput = (props) => {
  return (
    <div className="materialinput-container">
      <Row
        style={{
          background: "green",
        }}
      >
        <Col style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Label style={{ width: "250px", height: "50px" }}>
            {props.label}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={props.value}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export { MaterialInput };
