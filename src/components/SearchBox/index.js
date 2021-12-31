import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Overlay,
  Form,
  InputGroup,
  FormControl,
  Fade,
} from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import "./style.css";

const itemList = [
  "apple",
  "banana",
  "mango",
  "orange",
  "pinaple",
  "guava",
  "strawberry",
  "ram",
  "sita",
  "hari",
  "gopal",
  "chandu",
  "sachin",
  "nishes",
  "allilna",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "eight",
  "nine",
  "ten",
  "eleven",
];
function SearchBox(props) {
  const [items, setItems] = useState([]);
  const [itemname, setItemname] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (show) {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflowY = "auto";
    }
  }, [show]);

  const handleKeyUp = () => {
    const filterItem = itemList.filter((item) => {
      if (item.includes(itemname)) {
        return item;
      }
    });

    setItems(filterItem);
  };
  const handleShowSearchOverlay = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div className="container-search" ref={ref}>
      {/* <Button
        variant="danger"
        onClick={(event) => {
          handleShowSearchOverlay(event);
        }}
      >
        Search
      </Button> */}
      <IconContext.Provider
        value={{
          color: "black",
          size: "2em",
          className: "global-class-name",
        }}
      >
        <span className="btn-search-container d-block w-100 ">
          <IoSearch
            size="1.76em"
            onClick={(event) => {
              handleShowSearchOverlay(event);
            }}
          ></IoSearch>
        </span>
      </IconContext.Provider>
      <Overlay
        target={target}
        show={show}
        placement="left"
        transition={true}
        container={ref}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            onClick={() => {
              setShow(!show);
            }}
            {...props}
            style={{
              boxSizing: "border-box",
              backgroundColor: "rgba(255, 100, 100, 0.95)",
              height: "100vh",
              width: "100%",
              position: "fixed",
              top: "0",
              left: "0",
              color: "white",
              borderRadius: 3,
              transform: "translate(0,0,0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              ...props.style,
            }}
          >
            <div
              className="searchBox"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="searchForm">
                <InputGroup size="lg" className="mb-3">
                  <FormControl
                    id="myInput"
                    onKeyUp={handleKeyUp}
                    placeholder="Search..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={itemname}
                    onChange={(e) => {
                      setItemname(e.target.value);
                    }}
                  />
                  <Button
                    variant="dark"
                    id="button-addon2"
                    onClick={() => {
                      console.log("clicked");
                    }}
                  >
                    O
                  </Button>
                </InputGroup>
              </div>
              <div>
                <ul
                  id="myUl"
                  style={{
                    display:
                      items.length && itemname.length > 0 ? "block" : "none",
                  }}
                >
                  {items.map((item, index) => (
                    <li key={index}>
                      <a className="search-item-list" href="#">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Overlay>
    </div>
  );
}

export default SearchBox;
