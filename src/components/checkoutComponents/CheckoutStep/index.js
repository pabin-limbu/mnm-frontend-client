import React from "react";

function CheckoutStep(props) {
  return (
    <div
      className={`checkoutStep ${
        props.currentStep == props.stepNumber ? "active" : ""
      }`}
    >
      <div className="checkoutstep-title mt-2 mb-2">
        <span className="stepNumber">{props.stepNumber} </span>
        <span className="stepTitle">{props.title}</span>
      </div>
      {props.body && props.body}
    </div>
  );
}

export default CheckoutStep;
