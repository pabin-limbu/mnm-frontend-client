import React from "react";
import { Accordion } from "react-bootstrap";

function ItemSummaryAccordian(props) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <p>
            {props.title}
            <span style={{ fontWeight: "bold" }}>{`RS:${props.subTotal}`}</span>
          </p>
        </Accordion.Header>
        <Accordion.Body>{props.children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ItemSummaryAccordian;
