import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import MenuHeader from "../MenuHeader";

const Layout = (props) => {
  //console.log("layout");
  return (
    <>
      <Header></Header>
      <MenuHeader />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
