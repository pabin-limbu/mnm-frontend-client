import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import Filternav from "../../components/FilterNav";
import "./style.css";
const ProductListPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproductBySlug(props.match.params.slug));
  }, []);

  const product = useSelector((state) => state.product);

  //console.log(product);

  return (
    <Layout>
      <Container
        fluid

        // className=" d-flex flex-row justify-content-center item-align-center flex-wrap"
      >
        <div className="nav-breadcrumb-container">asd/asd/asd</div>
        <Row>
          <Col
            style={{ height: "100vh" }}
            xs={0}
            sm={0}
            md={0}
            lg={3}
            className="aside-filter-nav"
          >
            <Filternav slug={props.match.params.slug} ></Filternav>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <Row>
              {product.products.map((product) => {
                return (
                  <Col
                    lg={4}
                    md={4}
                    sm={4}
                    xs={6}
                    className=""
                    key={product.slug}
                  >
                    <Card className="p-2 mt-1">
                      <Card.Img
                        variant="top"
                        src={generatePublicUrl(product.productPictures[0].img)}
                      />

                      <Card.Body className="m-0 p-0">
                        <Card.Text>{product.name}</Card.Text>
                        <Card.Text>RS: {product.price}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductListPage;
