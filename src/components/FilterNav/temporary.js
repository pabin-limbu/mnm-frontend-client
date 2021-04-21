import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import "./style.css";

const Filternav = ({ slug }) => {
  const [clicked, setClicked] = useState(true);
  const [btnClicked, setBtnClicked] = useState([]);
  const [currentitemId, setcurrentitemId] = useState("");
  const category = useSelector((state) => state.category);
  const categoryLists = useSelector((state) => state.category.categoriesList);

  // /*CATEGORY LINEAR LIST */
  // const newList = [];
  // const categoryLinearList = (category) => {
  //   category.forEach((cat) => {
  //     newList.push(cat);
  //     if (cat.children.length > 0) {
  //       categoryLinearList(cat.children);
  //     }
  //   });
  //   return newList;
  // };

  // /**GET CATEGORY PARENT BY SLUG */
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

  // filter out current category id from categoryList using slug name.
  const getCurrentItemId = (categoryLists, slug) => {
    const currentSlugItem = categoryLists.filter(
      (currentCategory) => currentCategory.slug === slug
    );
    if (currentSlugItem.length > 0) {
      return currentSlugItem[0]._id;
    }
  };
  const currentItemlist = getCategoryById(currentitemId, categoryLists);

  useEffect(() => {
    //console.log("render");
    setcurrentitemId(() => getCurrentItemId(categoryLists, slug));
    setBtnClicked(
      currentItemlist.map((item) => {
        return { id: item._id };
      })
    );
  }, [categoryLists]);
  console.log(categoryLists);
  console.log(currentitemId);
  console.log(btnClicked);

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

  const hideSubmenu = () => {
    setClicked(false);
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
          {...(category.parentId
            ? null
            : {
                onClick: function (e) {
                  const parentNode = e.target.parentNode;
                  const childrens = parentNode.children;
                },
              })}
        >
          {category.parentId ? (
            category.children.length > 0 ? (
              <div className={"filternav-parentCategory"}>
                <a href={category.slug}>{category.name + "oo"}</a>

                {btnClicked.some((item) => item.id == category._id) ? (
                  <BsChevronCompactUp
                    value={`${category._id}`}
                    onClick={showSubMenu}
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
                  onClick={showSubMenu}
                />
              ) : (
                <BsChevronCompactDown
                  value={`${category._id}`}
                  onClick={showSubMenu}
                />
              )}
            </div>
          ) : (
            <a href="#">{category.name + "bb"}</a>
          )}

          {category.children.length > 0 &&
          category.children.some((item) => currentItemlist.includes(item)) ? (
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
        <button>+</button>
      </div>
      <div className="filternav-categories-container">
        <p>categorires</p>
        <div className="">
          <ul className="filternav-container">
            {category.categories.length > 0
              ? renderCategories(category.categories)
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filternav;
