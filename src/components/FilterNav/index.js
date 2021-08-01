import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Badge,
  Row,
  InputGroup,
} from "react-bootstrap";
import "./style.css";

function Filternav() {
  const [openSubmenu, setOpenSubmenu] = useState([]);
  const [showCategory, setShowCategory] = useState(true);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    let allButtons = document.getElementsByClassName("btn-collapse");
    setOpenSubmenu(
      //fetch all buttons and create array of object where each obj have {id:123, isClicked:false/true}.
      Array.from(allButtons).map((btn) => {
        return { id: btn.name, isClicked: false };
      })
    );
  }, [category]);

  const toggleSubMenu = (e) => {
    const parentNode = e.target.parentNode.parentNode.parentNode;

    setOpenSubmenu(
      openSubmenu.map((buttons) => {
        if (buttons.id == parentNode.id) {
          return { id: buttons.id, isClicked: !buttons.isClicked };
        }
        return buttons;
      })
    );
  };

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id} id={category._id} value={category.slug}>
          {category.parentId ? (
            //yes parent id.
            //evn if parent id or not there might be childrem.
            category.children.length > 0 ? (
              // yes parent yes children
              // parentId exist
              <Row>
                <Col sm={8}>
                  <a href={category.slug}> {category.name + " YP YC"}</a>
                </Col>
                <Col sm={4} className="d-flex justify-content-end">
                  {" "}
                  <Button
                    size="sm"
                    variant="outline-dark"
                    name={category._id}
                    className="btn-collapse"
                    onClick={(event) => {
                      toggleSubMenu(event);
                    }}
                  >
                    <BsChevronCompactDown className="sidenav-arrow-icon"></BsChevronCompactDown>
                  </Button>
                </Col>
              </Row>
            ) : (
              //yes parent no children
              <a href={category.slug} className="">
                {category.name + " Yp NC"}
                <Badge className="ml-2" variant="info">
                  12
                </Badge>
              </a>
            )
          ) : // no parent id
          category.children.length > 0 ? (
            //  no parent yes children
            <Row>
              <Col sm={8}>
                <a href={category.slug}>{category.name + " NP YC"}</a>{" "}
              </Col>
              <Col sm={4} className="d-flex justify-content-end">
                {" "}
                <Button
                  size="sm"
                  variant="outline-dark"
                  name={category._id}
                  className="btn-collapse"
                  onClick={(event) => {
                    toggleSubMenu(event);
                  }}
                >
                  <BsChevronCompactDown className="sidenav-arrow-icon"></BsChevronCompactDown>
                </Button>
              </Col>
            </Row>
          ) : (
            // no parent yes children
            <a href={category.slug}>
              {category.name + " NP NC"}{" "}
              <Badge className="ml-2" variant="info">
                12
              </Badge>
            </a>
          )}

          {
            // repeat above call if this category has children
            category.children.length > 0 ? (
              <Collapse
                in={
                  openSubmenu.length > 0
                    ? openSubmenu.filter(
                        (button) => button.id == category._id
                      )[0].isClicked
                    : false
                }
              >
                <ul>{renderCategories(category.children)}</ul>
              </Collapse>
            ) : null
          }
        </li>
      );
    }

    return categoryList;
  };

  return (
    <>
      <InputGroup className="d-flex justify-content-between">
        <Form.Label>CATEGORIES</Form.Label>

        <span
          className="btn-show-hide-category"
          onClick={() => {
            setShowCategory(!showCategory);
          }}
        >
          +
        </span>
      </InputGroup>

      <Collapse in={showCategory}>
        <ul className="filter-nav-category-list">
          {renderCategories(category.categories)}
        </ul>
      </Collapse>
    </>
  );
}

export default Filternav;
