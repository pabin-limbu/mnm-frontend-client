import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./style.css";
function Toastmessage({ show, onClose, delay }) {
  return (
    <div className={`toastmessage-container ${show ? "active" : ""}`}>
      <ToastContainer className="p-3">
        <Toast show={show} onClose={onClose} delay={delay} autohide>
          <Toast.Body className="text-white">
            <p>Item placed in cart Success !</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Toastmessage;
