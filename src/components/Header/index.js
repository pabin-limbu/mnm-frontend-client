import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  //console.log("header");
  return (
    <div>
      <div className="logo">
        <Link to="/">Midnight Madira</Link>
      </div>
    </div>
  );
};

export default Header;
