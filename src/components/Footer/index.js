import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

import "./style.css";

const Footer = () => {
  const categories = useSelector((state) => state.category.categories);

  const pageInformation = ["about us", "payment method"];
  const constacts = [
    "Email: midnightmadira@gmail.com",
    "Phone: 9840058472 | 9807909791",
    "Viber/ whatsapp: 9807909791",
  ];
  const paymentOptions = [
    "Cash on Delivery",
    "Card on Delivery",
    "Esewa",
    "mobile banking",
  ];

  const renderParentCategoryname = (categoryList) => {
    return (
      <ul className="footer-categoryname">
        {categoryList.map((category) => {
          return (
            <li key={category._id}>
              <a href={`/product/${category.slug}`}>
                <IoChevronForward className="footer-listarrow"></IoChevronForward>
                <span className="small-anchor"> {category.name}</span>
              </a>{" "}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderServices = (services, index) => {
    return (
      <ul className="footer-services">
        {services.map((service, index) => {
          return (
            <li key={index}>
              <a href="#">
                {" "}
                <IoChevronForward className="footer-listarrow"></IoChevronForward>
                <span className="small-anchor">{service}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };
  const renderPayentOptions = (services, index) => {
    return (
      <ul className="d-md-flex">
        {services.map((service, index) => {
          return (
            <li key={index} className="">
              <IoChevronForward className="footer-listarrow"></IoChevronForward>
              <span className="small-anchor">{service}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Container fluid className="footer-container  text-light">
      <Container className="pt-5">
        <Row>
          <Col xs={12} md={4}>
            <h5>Shop</h5>
            {renderParentCategoryname(categories)}
          </Col>

          <Col xs={12} md={4}>
            <h5>Information</h5>

            {renderServices(pageInformation)}
            {renderServices(constacts)}
          </Col>
          <Col xs={12} md={4}>
            <h5>Payment Options</h5>
            {renderServices(paymentOptions)}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={12} className="mt-4">
            <p className="text-center connect-with-us-heading">
              {" "}
              CONNECT WITH MIDNIGHT MADIRA AT
            </p>
          </Col>
          <Col xs={12} className="text-center">
            <FaFacebookSquare size="3em" /> <FaInstagram size="3em" />
          </Col>
        </Row>
        <Row>
          <p className=" text-center mb-0 mt-4 font-weight-bold">
            <small>
              {" "}
              Midnight Madira &copy; 2021 | Midnight madira all rights reserved
            </small>
          </p>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
