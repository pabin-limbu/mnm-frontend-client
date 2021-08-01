import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllCategoryList } from "../../store/actions";
import { BsChevronCompactDown } from "react-icons/bs";
import { Container, Form } from "react-bootstrap";
import { BsList, BsSearch } from "react-icons/bs";

import SideNavbar from "../SideNavBar/index";
import "./style.css";
const MenuHeader = () => {
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllCategoryList());
  }, []);

  const category = useSelector((state) => state.category);

  const showNavBar = () => {
    setShowNav(true);
  };
  const showSubMenu = () => {
    console.log("hiiiiiii");
  };

  //console.log("menu header");

  // /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className="cat-title-with-child d-flex justify-content-between">
                <a
                  href={`/${category.slug}?categoryId=${category._id}&type=${category.type}`}
                >
                  {category.name}
                </a>
                <BsChevronCompactDown onClick={showSubMenu} />
              </div>
            ) : (
              <a
                href={`/${category.slug}?categoryId=${category._id}&type=${category.type}`}
              >
                {" "}
                {category.name}
              </a>
            )
          ) : category.children.length > 0 ? (
            <div className="cat-title-with-child d-flex justify-content-between">
              <a href={category.slug}>{category.name}</a>
              <BsChevronCompactDown onClick={showSubMenu} />
            </div>
          ) : (
            <a
              href={`/${category.slug}?categoryId=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };
  /**RENDER CATEGORY END */

  return (
    <Container className="menu-header-container d-flex justify-content-start  justify-content-md-center ">
      <SideNavbar categories={category} />
      <div className="menu-header d-lg-block">
        <ul>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </div>
    </Container>
  );
};

export default MenuHeader;
