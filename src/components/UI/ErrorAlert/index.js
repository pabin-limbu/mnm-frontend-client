import React from "react";
import { Alert } from "react-bootstrap";
import "./style.css";

function ErrorAlert(props) {
  return (
    <Alert
      className="error-alert"
      dismissible={props.dismissible}
      onClose={props.onClose}
      show={props.show}
      variant={props.variant}
    >
      {props.message}
    </Alert>
  );
}

export default ErrorAlert;
