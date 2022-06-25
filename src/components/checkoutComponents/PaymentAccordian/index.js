import React from "react";
import CustomToggle from "../CustomToggle";
import { Accordion } from "react-bootstrap";

function PaymentAccordian({ setPayment }) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <CustomToggle setPayment={setPayment} eventKey="0" value="cash">
          Cash On Delivery
        </CustomToggle>
        <Accordion.Body> Pay cash during the delivery of item.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <CustomToggle setPayment={setPayment} eventKey="1" value="card">
          card on delivery
        </CustomToggle>
        <Accordion.Body>
          Pay by card during the delivery of item.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <CustomToggle setPayment={setPayment} eventKey="2" value="esewa">
          Esewa
        </CustomToggle>
        <Accordion.Body>Make payment using esewa app.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PaymentAccordian;
