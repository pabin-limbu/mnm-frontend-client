import React from "react";

function CheckoutFooter() {
  return (
    <div className="checkout-footer">
      <div className="placenotdelivered">
        <h5>Place we dont deliver</h5>
        <p>1. Outside Jhapa, morang</p>
        <p>2. Outside of mechi border</p>
      </div>
      <div className="placenotdelivered">
        <h5>place we charge extra for deliver</h5>
        <p>1. Outside birtamode , sanishare , charali</p>
      </div>
    </div>
  );
}

export default CheckoutFooter;
