import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import MenuHeader from "../MenuHeader";
import SearchBox from "../SearchBox";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import "./style.css";
import { getAllProduct } from "../../store/actions";

const Header = (props) => {
  const [sticky, setSticky] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const cartItems = useSelector((state) => state.cart);

  //search bar props.
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const allproducts = useSelector((state) => state.product.allProducts);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  //test
  const handleClose = () => {
    setShow(!show);
  };

  //set item count in cart logo
  useEffect(() => {
    setItemCount(Object.keys(cartItems.cartItems).length);

    return () => {
      setItemCount(0);
    };
  }, [cartItems]);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      setSticky("sticky");
    } else {
      setSticky("");
    }
  });

  const goToCheckoutPage = () => {
    console.log(props);
    props.history && props.history.push("/cart");
  };

  return (
    <div className="header-wrapper">
      <Navbar className="main-header  d-lg-flex justify-content-end d-none ">
        <Link to="#">About</Link>
        <Link to="#">Contact us</Link>
        <Link to="#">Login / Register</Link>
        <div></div>

        <IconContext.Provider
          value={{ color: "orange", className: "", size: "1.5em" }}
        >
          <button
            onClick={() => {
              setShow(!show);
            }}
            className="btnsearch"
          >
            <BsSearch />
          </button>
        </IconContext.Provider>
      </Navbar>
      <Container fluid className={`header-menu-wrapper pt-sm-2 ${""}`}>
        <Row className="d-flex">
          <Col xs={6} sm={4} md={2}>
            {" "}
            <Navbar.Brand href="/" className="brand-logo-mnm">
              <img
                src="/images/logo.png"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                height="55"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Navbar.Brand>
          </Col>
          <Col
            className="d-flex justify-content-end align-items-center pr-0 "
            xs={2}
            sm={6}
            md={8}
          >
            {" "}
            {/* dropdown menu */}
            <MenuHeader />
          </Col>
          <Col className="d-flex" xs={2} sm={1} md={1}>
            <div className="cartbadge-container w-100">
              <div className="circlediv"></div>
              <div className="squarediv" onClick={goToCheckoutPage}>
                <span id="cart-item-count">{itemCount}</span>
              </div>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-start align-items-center d-lg-none pl-0"
            xs={2}
            sm={1}
            md={1}
          >
            <IconContext.Provider
              value={{ color: "orange", className: "", size: "2em" }}
            >
              <button
                onClick={() => {
                  setShow(!show);
                }}
                className="btnsearch"
              >
                <BsSearch />
              </button>
            </IconContext.Provider>
          </Col>
        </Row>
      </Container>

      {/* search item */}
      <div className="searchbox-container">
        <SearchBox
          show={show}
          handleClose={handleClose}
          query={query}
          setQuery={setQuery}
          allproducts={allproducts}
        ></SearchBox>
      </div>
    </div>
  );
};

export default Header;
