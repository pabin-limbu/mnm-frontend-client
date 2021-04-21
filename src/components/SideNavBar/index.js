import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { BsList, BsSearch } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import "./style.css";

const SideNavBar = (props) => {
  //Fconsole.log("sidenavbar");
  const [showNav, setShownav] = useState("");
  const [panelOverlayActive, setPanelOverlayActive] = useState("");
  const [test, setTest] = useState([]);

  // useEffect(() => {
  //   setTest(getCategoryId(props.categories.categories));
  // }, []);

  // const getCategoryId = (function (value) {
  //   var ids = [];
  //   return function (value) {
  //     for (let per of value) {
  //       ids.push(per._id);
  //       if (per.children.length > 0) {
  //         getCategoryId(per.children);
  //       }
  //     }

  //     return ids;
  //   };
  // })();

  /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];

    for (let category of categories) {
      categoryList.push(
        <li
          key={category._id}
          id={category._id}
          className={""}
          {...(category.parentId
            ? null
            : {
                onClick: function (e) {
                  const parentNode = e.target.parentNode;
                  console.log(parentNode);
                  const childrens = parentNode.children;
                  console.log(childrens);
                  childrens[1].classList.toggle("active");
                },
              })}
        >
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className={"subnav-list-title"}>
                <a href={category.slug}>{category.name + "oo"}</a>
              </div>
            ) : (
              <a href={category.slug}> {category.name}</a>
            )
          ) : category.children.length > 0 ? (
            <div className={"subnav-list-title"}>
              <a href={category.slug}>{category.name + "aa"}</a>
            </div>
          ) : (
            <a href="#">{category.name}</a>
          )}
          {category.children.length > 0 ? (
            <ul className="">{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  return (
    <div className="sidenavbarcontainer d-lg-none">
      <div className="sandwhich-btn-container">
        <button
          className="btn-sandwhichmenu"
          onClick={() => {
            setShownav("show");
            setPanelOverlayActive("active");
          }}
        >
          <BsList></BsList>
        </button>
        <div className="searc-bar d-flex">
          <Form.Control type="text" width="sm" placeholder="..." />
          <button className="btn search-btn">
            <BsSearch></BsSearch>
          </button>
        </div>
      </div>

      <div className={`panel-overlay ${panelOverlayActive}`}></div>
      <div className={`sidenav-container ${showNav}`}>
        <button
          onClick={() => {
            setShownav("");
            setPanelOverlayActive("");
          }}
        >
          hide
        </button>

        {/* <button
          onClick={() => {
            //  console.log(renderCategories(props.categories.categories));
            console.log(props.categories.categories);
          }}
        >
          show
        </button> */}

        <div className="sidenav-category-list">
          <ul className="sidenav-list-container">
            {props.categories.categories.length > 0
              ? renderCategories(props.categories.categories)
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
