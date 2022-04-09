import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";
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
  const { show, handleClose, query, setQuery, allproducts } = props;
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    //hide scrollbar from the page
    if (show) {
      document.getElementById("search-overlay").classList.toggle("active");
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.querySelector("html").style.marginRight = "17px";
    } else {
      document.getElementById("search-overlay").classList.remove("active");
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
      document.querySelector("html").style.marginRight = "0px";
    }
  }, [show]);

  const handlekeyPress = async () => {
    let result = [];
    if (query !== "" && query.length > 2) {
      result = await allproducts.filter((item) => {
        if (item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
          return item;
        }
      });
    }
    setFilteredItem(result);
  };

  //logs

  return (
    <div
      className="search-overlay"
      id="search-overlay"
      onClick={() => {
        handleClose();
      }}
    >
      <div className="closeButton">
        <span className="searchBtnClose">x</span>
      </div>

      <div className="searcharea-container">
        <div className="searchfeild">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search..."
              value={query}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={() => {
                handlekeyPress();
              }}
            />
            <Button
              variant="primary"
              id=""
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              search
            </Button>
          </InputGroup>
        </div>

        <div
          className={`searchResults ${
            filteredItem.length > 0 ? "d-block" : "d-none"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ul className="filter-List">
            {filteredItem.map((item) => {
              return (
                <li key={""} className="filter_listItem">
                  <a href={`/${item.slug}/${item._id}/`}>
                    <Row>
                      <Col xs={2}>
                        <img
                          src={generatePublicUrl(item.productPictures[0].img)}
                          alt=""
                          height={30}
                          style={{ borderRadius: "50%" }}
                        />
                      </Col>
                      <Col xs={7}>
                        <p>{`${item.name}`}</p>
                      </Col>
                      <Col xs={3}>
                        <p id="search-item-price">{`rs:${item.price}`}</p>
                      </Col>
                    </Row>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
