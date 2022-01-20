import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./style.css";

const MaterialInput = (props) => {
  return (
    <div className="materialinput-container">
      <Row>
        <Col xs={12}>
          <div className=" ps-2 materialinput-label d-flex justify-content-start align-items-center ">
            <Form.Label> {props.label}</Form.Label>
          </div>
        </Col>
        <Col xs={12}>
          <div className="ps-2 pe-2">
            <Form.Control
              type="text"
              value={props.value}
              onChange={props.onChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { MaterialInput };
