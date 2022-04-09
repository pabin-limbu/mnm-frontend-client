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

  //test array
  const [testArray1, settestArray1] = useState(["pabin", "sachin", "alina"]);
  const [testArray2, settestArray2] = useState(["apple", "mango", "banana"]);
  const [testText, setTestText] = useState("");

  useEffect(() => {
    //hide scrollbar from the page
    if (show) {
      document.getElementById("search-overlay").classList.toggle("active");
      // document.getElementsByTagName("body")[0].style.overflow = "hidden";
      document.querySelector("html").style.marginRight = "17px";
    } else {
      document.getElementById("search-overlay").classList.remove("active");
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
      document.querySelector("html").style.marginRight = "0px";
    }
  }, [show]);

  const handlekeyPress = () => {
    setTestText("pabin");
    let result = [];

    if (query !== "" && query.length > 2) {
      result = ["pabin", "sachin", "alina"];
      // result = allproducts.filter((item) => {
      //   if (item.name.toLocaleLowerCase().includes(query)) {
      //     return item;
      //   }
      // });
    }
    setFilteredItem(result);
  };

  //test
  const handleTest1 = (e) => {
    e.stopPropagation();
    settestArray1([...testArray1, "nishes"]);
  };
  const handleTest2 = (e) => {
    e.stopPropagation();
    const newArray = [...testArray1];
    newArray.shift();
    settestArray1(newArray);
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
            onInput={() => {
              handlekeyPress();
            }}
            onKeyDown={() => {
              console.log("keydown : " + query);
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
        className={`searchResults`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {JSON.stringify(testText)}
        {JSON.stringify(filteredItem)}
        <ul className="filter-List">
          {filteredItem.map((item) => {
            return (
              <li key={""} className="filter_listItem">
                {item}
                {/* <a href={`/${item.slug}/${item._id}/`}>
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
                </a> */}
              </li>
            );
          })}
        </ul>
      </div>

      <h1>Test</h1>
      <button
        onClick={(event) => {
          handleTest1(event);
        }}
        style={{ color: "black" }}
      >
        Test
      </button>
      <button
        onClick={(event) => {
          handleTest2(event);
        }}
        style={{ color: "black" }}
      >
        Test 2
      </button>
      <div
        className="testresult"
        style={{ width: "400px", height: "400px", backgroundColor: "white" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {JSON.stringify(testArray1)}
        <ul>
          {testArray1.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchBox;
