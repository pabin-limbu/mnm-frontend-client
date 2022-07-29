import React from "react";
import Layout from "../../components/Layout";
import { Row, Col } from "react-bootstrap";
import "./style.css";

function ContactUs() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="visit-breadCrumb">
          <p>
            <a href="/">Home/</a>
          </p>
          <p>contact</p>
        </div>
        <Row>
          <Col>
            <div className="visit">
              <h3>Contact us at</h3>
              <ul>
                <li>Address: Birtamode, Jhapa</li>
                <li>
                  {" "}
                  Email:
                  <a href="mailto: midnightmadira@gmail.com">
                    midnightmadira@gmail.com
                  </a>
                </li>

                <li>
                  Phone: <a href="tel:9840058472">9840058472</a>{" "}
                  <a href="tel:9807909791">9807909791</a>{" "}
                  <a href="tel:9807909792">9807909792</a>
                </li>
                <li>
                  Viber:
                  <a href="viber://chat?number=+9779807909791">
                    <i class="fab fa-viber"></i> +977 9807909791
                  </a>
                </li>
                <li>
                  whatsapp:
                  <a
                    href="https://wa.me/9779807909791"
                    target="_blank"
                    rel="noopener"
                  >
                    +977 9807909791
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ContactUs;
