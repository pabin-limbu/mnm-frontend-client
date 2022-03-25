import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllCategoryList } from "../../store/actions";
import { BsChevronCompactDown } from "react-icons/bs";
import { Container } from "react-bootstrap";
import SideNavbar from "../SideNavBar/index";
import { Link } from "react-router-dom";
import "./style.css";
const MenuHeader = () => {
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    //dispatch(getAllCategoryList());
  }, []);

  const category = useSelector((state) => state.category);

  const showNavBar = () => {
    setShowNav(true);
  };
  const showSubMenu = () => {
    console.log("hiiiiiii");
  };

  // /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className="cat-title-with-child d-flex justify-content-between">
                <Link to={`/${category.slug}?categoryId=${category._id}`}>
                  {category.name}
                </Link>
                <BsChevronCompactDown onClick={showSubMenu} />
              </div>
            ) : (
              <Link to={`/${category.slug}?categoryId=${category._id}`}>
                {category.name}
              </Link>
            )
          ) : category.children.length > 0 ? (
            <div className="cat-title-with-child d-flex justify-content-between ">
              <a href={`/${category.slug}?categoryId=${category._id}`}>
                {category.name}
              </a>
              <BsChevronCompactDown onClick={showSubMenu} />
            </div>
          ) : (
            <Link to={`/${category.slug}?categoryId=${category._id}`}>
              {" "}
              {category.name}
            </Link>
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
    <Container fluid className="menu-header-container pr-0">
      <SideNavbar categories={category} />
      <div className="menu-header d-lg-block ">
        <ul className="d-flex flex-wrap justify-content-end  align-content-center ">
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </ul>
      </div>
    </Container>
  );
};

export default MenuHeader;
