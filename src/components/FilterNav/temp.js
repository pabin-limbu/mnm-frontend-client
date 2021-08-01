import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { Collapse } from "react-bootstrap";
import "./style.css";
function Filternav({ slug }) {
  const [openCategory, setOpenCategory] = useState(true);
  const [btnClicked, setBtnClicked] = useState([]);
  const [openSubmenu, setOpenSubmenu] = useState([]);
  const category = useSelector((state) => state.category);
  const categoryList = category.categoriesList;
  useEffect(() => {
    if (categoryList.length > 0) {
      const currentCategorryId = getCurrentItemId(categoryList, slug);
      const currentCategory = getCategoryById(currentCategorryId, categoryList);
      setBtnClicked(
        currentCategory.map((item) => {
          return { id: item._id };
        })
      );
    }
  }, [categoryList]);

  const getCurrentItemId = (categoryLists, slug) => {
    const currentSlugItem = categoryLists.filter(
      (currentCategory) => currentCategory.slug === slug
    );
    if (currentSlugItem.length > 0) {
      return currentSlugItem[0]._id;
    }
  };

  const catBySlug = [];
  const getCategoryById = (id, category) => {
    category.forEach((cat) => {
      if (cat._id == id) {
        catBySlug.push(cat);
        if (cat.parentId) {
          getCategoryById(cat.parentId, category);
        }
      }
    });
    return catBySlug;
  };

  //console.log(btnClicked);

  const showSubMenu = (e) => {
    const parentNode = e.target.parentNode;
    const childrens = parentNode.parentNode.children;
    childrens[1].classList.toggle("active");
    const value = e.target.getAttribute("value");
    setBtnClicked((btnClicked) => [...btnClicked, { id: value }]);
    // if (btnClicked.some((btn) => btn.val == e.target.val)) {
    //   console.log("cannot update");
    // } else {
    //   const val = e.target.id;
    //   setBtnClicked((btnClicked) => [...btnClicked, { id: value }]);
    // }
  };

  const hideSubmenu = (e) => {
    const value = e.target.getAttribute("value");
    const newBtnClicked = btnClicked.filter((item) => item.id !== value);
    setBtnClicked(newBtnClicked);
  };

  /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];

    for (let category of categories) {
      categoryList.push(
        <li
          key={category._id}
          id={category._id}
          value={category.slug}
          className={"filternav-category-list"}
        >
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className={"filternav-parentCategory"}>
                <a href={category.slug}>{category.name + "ooo"}</a>

                {btnClicked.some((item) => item.id == category._id) ? (
                  <BsChevronCompactUp
                    value={`${category._id}`}
                    onClick={hideSubmenu}
                  />
                ) : (
                  <BsChevronCompactDown
                    value={`${category._id}`}
                    onClick={showSubMenu}
                  />
                )}
              </div>
            ) : (
              <a href={category.slug}> {category.name}</a>
            )
          ) : category.children.length > 0 ? (
            <div className={"filternav-parentCategory"}>
              <a href={category.slug}>{category.name + "aa"}</a>
              {btnClicked.some((item) => item.id == category._id) ? (
                <BsChevronCompactUp
                  value={`${category._id}`}
                  onClick={hideSubmenu}
                />
              ) : (
                <BsChevronCompactDown
                  value={`${category._id}`}
                  onClick={showSubMenu}
                />
              )}
            </div>
          ) : (
            <a href="#">{category.name + " bb"}</a>
          )}

          {category.children.length > 0 &&
          category.children.some(
            (item) => item._id == btnClicked.includes(item.id)
          ) ? (
            <ul className={"filternav-children-container active"}>
              {renderCategories(category.children)}
            </ul>
          ) : (
            <ul className={"filternav-children-container"}>
              {renderCategories(category.children)}
            </ul>
          )}
        </li>
      );
    }
    return categoryList;
  };

  return (
    <div className="my-aside">
      <div className="categories-label-button d-flex justify-content-between">
        <h5>Categories</h5>
        <button
          onClick={() => {
            setOpenCategory(!openCategory);
          }}
        >
          +
        </button>
      </div>
      <div className="filternav-categories-container">
        <p>categorires</p>
        <div className="">
          <Collapse in={openCategory}>
            <ul className="filternav-container">
              {category.categories.length > 0
                ? renderCategories(category.categories)
                : null}
            </ul>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default Filternav;
