import React from "react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = (props) => {
  // console.log(props);
  return (
    <>
      <Header {...props}></Header>

      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
