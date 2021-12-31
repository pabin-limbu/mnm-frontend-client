import React, { useState, useEffect } from "react";
import { Button, Collapse, Container, Form } from "react-bootstrap";
import { BsList, BsSearch } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import "./style.css";

const SideNavBar = () => {
  const [showNav, setShownav] = useState("");
  const [panelOverlayActive, setPanelOverlayActive] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState([]);
  const category = useSelector((state) => state.category);

  //get all buttons after the dom is copleted rendering.
  useEffect(() => {
    let allbuttons = document.getElementsByClassName("btn-collapse");

    setOpenSubmenu(
      Array.from(allbuttons).map((btn) => {
        return { id: btn.name, isCicked: false };
      })
    );
  }, [category]);

  const toogleSubMenu = (e) => {
    const parentNode = e.target.parentNode.parentNode;

    setOpenSubmenu(
      openSubmenu.map((buttons) => {
        if (buttons.id == parentNode.id) {
          return { id: buttons.id, isCicked: !buttons.isCicked };
        }
        return buttons;
      })
    );
  };

  /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];

    for (let category of categories) {
      categoryList.push(
        <li
          key={category._id}
          id={category._id}
          className={" "}
          {...(category.parentId
            ? null
            : {
                onClick: function (e) {
                  // const parentNode = e.target.parentNode;
                  // const childrens = parentNode.children;
                  // if (childrens[1].tagName === "UL") {
                  //   childrens[1].classList.toggle("active");
                  // }
                },
              })}
        >
          {category.parentId ? ( //condition 1
            category.children.length > 0 ? ( //Condition 2
              <div
                className={
                  "subnav-list-title d-flex justify-content-between collapsible"
                }
              >
                <a href={category.slug}>{category.name}</a>

                <Button
                  name={category._id}
                  className="btn-collapse"
                  variant="dark"
                  size="sm"
                  onClick={(event) => {
                    toogleSubMenu(event);
                  }}

                  //  onClick={() => setOpen(!open)}
                >
                  <BsChevronCompactDown className="arrow-icon" />
                </Button>
              </div>
            ) : (
              //Condition 2
              <a href={category.slug}> {category.name}</a>
            )
          ) : //condition 1
          category.children.length > 0 ? ( //condition 3
            <div
              className={
                "subnav-list-title d-flex justify-content-between collapsible"
              }
            >
              <a href={category.slug}>{category.name}</a>
              <Button
                name={category._id}
                className="btn-collapse"
                variant="dark"
                size="sm"
                onClick={(event) => {
                  toogleSubMenu(event);
                }}
                //onClick={() => setOpen(!open)}
              >
                <BsChevronCompactDown className="arrow-icon" />
              </Button>
            </div>
          ) : (
            //condition 3
            <a href="#">{category.name}</a>
          )}

          {category.children.length > 0 ? (
            <Collapse
              in={
                openSubmenu.length > 0
                  ? openSubmenu.filter((button) => button.id == category._id)[0]
                      .isCicked
                  : false
              }
            >
              <ul className="collapsable-container">
                {renderCategories(category.children)}
              </ul>
            </Collapse>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  return (
    <div className="sidenavbarcontainer d-lg-none">
      <div className="sandwhich-btn-container ">
        <button
          className="btn-sandwhichmenu"
          onClick={() => {
            setShownav("sidenav-show");
            setPanelOverlayActive("active");
          }}
        >
          <IoMdMenu size="2em"></IoMdMenu>
        </button>
      </div>

      <div
        className={`panel-overlay ${panelOverlayActive}`}
        onClick={() => {
          setShownav("");
          setPanelOverlayActive("");
        }}
      ></div>

      <div className={`sidenav-container ${showNav}  bg-dark`}>
        <span
          className="btn-close-sideNav"
          onClick={() => {
            setShownav("");
            setPanelOverlayActive("");
          }}
        >
          X
        </span>

        <div className="sidenav-category-list">
          <ul className="sidenav-list-container  bg-dark p-2">
            {category.categories.length > 0
              ? renderCategories(category.categories)
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
