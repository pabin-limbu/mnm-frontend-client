import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import "./style.css";

const Footer = () => {
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);

  const renderParentCategoryname = (categoryList) => {
    return (
      <ul>
        {categoryList.map((category) => {
          return (
            <li>
              <a href={category.slug}>{category.name}</a>{" "}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Container fluid className="bg-dark text-light">
      <Row>
        <Col xs={12}>
          <p style={{ display: "block" }}>Shop</p>
          {renderParentCategoryname(categories)}
        </Col>
        <Col xs={12}>
          <p style={{ display: "block" }}>Services</p>
          <ul>
            <li>
              <a href="#">Delivery</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">enquiry</a>
            </li>
          </ul>
        </Col>
        <Col xs={12}>
          {" "}
          <p style={{ display: "block" }}>Information</p>
          <ul>
            <li>
              <a href="#">About us</a>
            </li>

            <li>
              <a href="#">Payment method</a>
            </li>
          </ul>
        </Col>
        <Col xs={12}>
          <p  className="h5" style={{ display: "block" }}>Contact us</p>
          <ul>
            <li>Email: midnightmadira@gmail.com </li>
            <li>Phone: 9840058472 | 9807909791 | 9807909792</li>
            <li>Viber/ whatsapp: 9807909791</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className="">
          <p className="h5">Payment Options</p>
        </Col>
        <Col xs={12} className="">
          cash on delivery
        </Col>
        <Col xs={12} className="">
          {" "}
          card on delivery{" "}
        </Col>
        <Col xs={12} className="">
          Connect IPS
        </Col>
        <Col xs={12} className="">
          eSewa
        </Col>
        <Col xs={12} className="">
          Mobile banking
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-4">
          <p className="text-center"> Connect with us at</p>
        </Col>
        <Col xs={12} className="text-center">
          <FaFacebookSquare /> <FaInstagram />
        </Col>
      </Row>
      <div>
        <p className=" text-center mb-0 mt-4">
          <small>
            {" "}
            Midnight Madira &copy; 2021 | Midnight madira all rights reserved
          </small>
        </p>
      </div>
    </Container>
  );
};

export default Footer;
