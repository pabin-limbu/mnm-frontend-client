import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./style.css";

const Layout = (props) => {
  // console.log(props);
  return (
    <>
      <div className="layout-container">
        <Header {...props}></Header>

        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
