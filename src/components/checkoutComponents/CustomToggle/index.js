import React from "react";
import { InputGroup, useAccordionButton } from "react-bootstrap";
function CustomToggle({ children, value, eventKey, setPayment }) {
  const decoratedOnClick = useAccordionButton(eventKey, (e) => {
    setPayment(e.target.value);
  });

  return (
    <InputGroup>
      <InputGroup.Radio
        name="toogler"
        value={value}
        onChange={decoratedOnClick}
        aria-label="Radio button for following text input"
        className=""
        defaultChecked={value == "cash" ? true : false}
      />
      <InputGroup.Text id="" className="checkout-paymentlist-item">
        {children}
      </InputGroup.Text>
    </InputGroup>
  );
}

export default CustomToggle;
