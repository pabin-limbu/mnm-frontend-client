import Button from "@restart/ui/esm/Button";
import React from "react";
import { Accordion, Card, useAccordionButton, Form } from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Form.Check
      type={"radio"}
      id={``}
      label={`default check`}
      onChange={console.log("checked")}
    />
  );
}
function PaymentForm() {
  return (
    <>
      <Accordion>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Click me!</CustomToggle>
            <Button>click</Button>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">Click me!</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default PaymentForm;
