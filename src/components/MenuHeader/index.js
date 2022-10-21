import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllCategoryList } from "../../store/actions";
import { BsChevronCompactDown } from "react-icons/bs";
import { Container } from "react-bootstrap";
import SideNavbar from "../SideNavBar/index";
import { Link } from "react-router-dom";
import "./style.css";
import { IconContext } from "react-icons";
const MenuHeader = () => {
  const [showNav, setShowNav] = useState(false);
  const categoryStore = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const showNavBar = () => {
    setShowNav(true);
  };
  const showSubMenu = () => {
    // console.log("hiiiiiii");
  };

  //FOR URL . if parent mention parent also.
  function extractParentName(items, curretnItem) {
    let name = "";

    function getName(items, curretnItem) {
      if (!curretnItem.parentId) return;
      let selectedParent = items.find(
        (item) => item._id === curretnItem.parentId
      );
      let parentName = String(selectedParent.slug).concat("/");
      name = parentName + name;
      if (selectedParent.parentId) {
        getName(items, selectedParent);
      }
    }
    getName(items, curretnItem);

    return name;
  }

  /**RENDER CATEGORY */
  const renderCategories = (categories, categoryList) => {
    let categoryListArray = [];
    for (let category of categories) {
      categoryListArray.push(
        <li key={category._id}>
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className="cat-title-with-child d-flex justify-content-between">
                <Link
                  to={`/shop/${extractParentName(categoryList, category)}${
                    category.slug
                  }`}
                >
                  {category.name}
                </Link>
                <IconContext.Provider
                  value={{
                    className: "arrowDown",
                    size: "1em",
                  }}
                >
                  <BsChevronCompactDown onClick={showSubMenu} />
                </IconContext.Provider>
              </div>
            ) : (
              <Link
                to={`/shop/${extractParentName(categoryList, category)}${
                  category.slug
                }`}
              >
                {category.name}
              </Link>
            )
          ) : category.children.length > 0 ? (
            <div className="cat-title-with-child d-flex justify-content-between ">
              <Link
                to={`/shop/${extractParentName(categoryList, category)}${
                  category.slug
                }`}
              >
                {category.name}
              </Link>
              <IconContext.Provider
                value={{ color: "gray", className: "", size: "1em" }}
              >
                <BsChevronCompactDown onClick={showSubMenu} />
              </IconContext.Provider>
            </div>
          ) : (
            <Link
              to={`/shop/${extractParentName(categoryList, category)}${
                category.slug
              }`}
            >
              {" "}
              {category.name}
            </Link>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children, categoryList)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryListArray;
  };
  /**RENDER CATEGORY END */

  return (
    <Container fluid className="menu-header-container pr-0">
      <SideNavbar categories={categoryStore} />
      {/* <p>{JSON.stringify(categoryStore.categoriesList)}</p> */}
      <div className="menu-header d-lg-block ">
        <ul className="d-flex flex-wrap justify-content-end  align-content-center ">
          {categoryStore.categories.length > 0 &&
          categoryStore.categoriesList.length > 0
            ? renderCategories(
                categoryStore.categories,
                categoryStore.categoriesList
              )
            : null}
        </ul>
      </div>
    </Container>
  );
};

export default MenuHeader;
