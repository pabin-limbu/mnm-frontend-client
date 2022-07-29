import React from "react";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import "./style.css";

function AboutUs() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="about-breadCrumb">
          <p>
            {" "}
            <a href="/">Home/</a>
          </p>
          <p>about</p>
        </div>

        <div className="about-sections d-block">
          <Row>
            <Col sm={12}>
              {" "}
              <div className="sectionOne">
                <h1> Your Best alcohal supplier </h1>
                <h6 id="about-header-two"> jhapa nepal </h6>
                <p>
                  Midnight Madira is the largest online liquor store in Jhapa
                  that offer an extensive selection of genuine domestic and
                  foreign liquors, beverages, cigarettes, and mixers at best
                  price.We provide delivery right at your doorstep, with
                  distance coverage up to 15 KM outside Birtamode.
                </p>
                <h1>Delivery Hour</h1>
                <p>
                  Our delivery hours are from 10:00 AM to 1:00 AM(midnight), and
                  we are open 365 days.
                </p>
              </div>
            </Col>
            <Col sm={12}>
              <div className="sectionTwo">
                <h1>Payment Options</h1>
                <ul>
                  <li>Cash On Delivery</li>
                  <li>Card On Delivery</li>
                  <li>Connect IPS</li>
                  <li>eSewa</li>
                  <li>FonePay</li>
                  <li>NPR Online Payment</li>
                </ul>
              </div>
            </Col>
            <Col sm={12}>
              <div className="mnm-slogan d-flex justify-content-center">
                <p>
                  {" "}
                  <span>M</span>adir since 2019
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
