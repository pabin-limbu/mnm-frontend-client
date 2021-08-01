import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./style.css";
const Header = () => {
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    setCartItemQuantity(checkQuantityincart(cartItems));
    return () => {};
  }, [cartItems]);

  const checkQuantityincart = (cartItems) => {
    const items = cartItems.cartItems;
    let quantity = 0;
    //if items not undefined or null.
    items &&
      Object.keys(items).map((item) => {
        quantity += items[item].qty;
      });
    return quantity;
  };

  return (
    <Navbar bg="white">
      <Navbar.Brand href="/" className="brand-logo-mnm">
        <img
          src="/images/logo.png"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          height="55"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Navbar.Brand>
      <Link to="/cart">View cart</Link>
    </Navbar>
    // <div>
    //   <div className="logo">
    //     <Link to="/">Midnight Madira</Link>
    //   </div>
    //   <div className="cart-logo">
    //     <p>{cartItemQuantity}</p>
    //     <Link to="/cart">View cart</Link>
    //   </div>
    // </div>
  );
};

export default Header;
