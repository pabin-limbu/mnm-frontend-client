import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../store/actions";
import Layout from "../../components/Layout";
import ItemCards from "../../components/UI/Cards/ItemCards";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Filternav from "../../components/FilterNav";
import { addToCart } from "../../store/actions/cart.actions";
import ProductViewModal from "../../components/UI/modal/productViewModal";
import Toastmessage from "../../components/UI/ToastMessage";
import "./style.css";
const ProductListPage = (props) => {
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [breadCrumbArray, setBreadcrumbArray] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productLoading, setProductLoading] = useState(true);
  const [error, setError] = useState(null);
  const [test, setTest] = useState("");

  const product = useSelector((state) => state.product);
  const categoryStore = useSelector((state) => state.category);
  const dispatch = useDispatch();

  console.log("i rendered");
  //get all categorylist in state.
  useEffect(() => {
    setCategoryList(categoryStore.categoriesList);
  }, [categoryStore.categoriesList]);

  useEffect(() => {
    setProductLoading(product.productsLoading);
  }, [product.productsLoading]);

  //get product name in state
  useEffect(() => {
    const productname = getProductName(props);
    let currentItem = categoryList.find((item) => item.slug == productname);
    setSelectedProduct(currentItem);
  }, [props.history.location.pathname, categoryList]);

  // console.log({ selectedProduct });

  //get all product nominated for breadcrumb menuin state.
  useEffect(() => {
    if (categoryList.length > 0 && selectedProduct != null) {
      let breadCrumbArray = extractParentNameArray(
        categoryStore.categoriesList,
        selectedProduct
      );
      //reverse breadcrumb array to match the order of item placement in breadcrumb menu.
      setBreadcrumbArray(breadCrumbArray.reverse());
    }
  }, [selectedProduct]);

  useEffect(() => {
    setError(product.error);
  }, [product.error]);

  useEffect(() => {
    //if product list page receive featured as slug then current product should be all product that are featured.
    if (props.match.params.slug === "featured") {
      setCurrentProducts(product.featuredProduct);
    }

    //if not featured then use product name to et specific product.
    if (props.match.params.slug !== "featured") {
      const productName = getProductName(props);
      dispatch(getproductBySlug(productName));
    }
  }, [props.history.location.pathname]);

  useEffect(() => {
    if (props.match.params.slug !== "featured") {
      setCurrentProducts(product.products);
      setProductLoading(product.productsLoading);
    }
  }, [product.products]);

  const getProductName = (props) => {
    const pathName = props.history.location.pathname.split("/");
    return pathName[pathName.length - 1];
  };

  //FOR BREAD CRUMB MENU . if parent mention parent also.
  function extractParentNameArray(items, curretnItem) {
    let breadCrumbmenuItems = [curretnItem];

    function getName(items, curretnItm) {
      if (!curretnItem.parentId) return;
      let selectedParent = items.find(
        (item) => item._id === curretnItm.parentId
      );
      breadCrumbmenuItems.push(selectedParent);
      if (selectedParent.parentId) {
        getName(items, selectedParent);
      }
    }
    getName(items, curretnItem);
    return breadCrumbmenuItems;
  }

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

  // const addProductToCart = (product) => {
  //   const { _id, name, price, quantity, productPictures } = product;
  //   dispatch(addToCart({ _id, name, price, quantity, productPictures }, 1));
  // };

  const toggleShowToast = () => setShowToast(!showToast);

  const renderBreadCrumb = (parentList) => {
    return parentList.reverse().map((item) => {
      if (!item.parentId) {
        return (
          <li key={item._id}>
            <a href={`/shop/${item.slug}`}>{item.name}</a>
          </li>
        );
      }
      if (item.parentId) {
        return (
          <li key={item._id}>
            <a
              href={`/shop/${extractParentName(categoryList, selectedProduct)}${
                item.slug
              }`}
            >
              {item.name}
            </a>
          </li>
        );
      }
    });
  };
  const renderErrorMessage = () => {
    return <p>{error}</p>;
  };

  const renderProductCard = () => {
    console.log(currentProducts);
    return (
      <Row className="row-cols-lg-5">
        {productLoading == false && currentProducts.length == 0
          ? null
          : currentProducts &&
            currentProducts.map((product) => {
              return (
                <Col
                  xs={6}
                  sm={4}
                  md={3}
                  key={product.slug}
                  className="mb-4 mt-4"
                >
                  <ItemCards
                    setShowProductViewModal={setShowProductViewModal}
                    setCurrentProduct={setCurrentProduct}
                    item={product}
                    setShowToast={setShowToast}
                  ></ItemCards>
                </Col>
              );
            })}
      </Row>
    );
  };

  const sortItems = (currentProductArray, soryBy) => {
    console.log("sort by Alpabet");
    let sortedArray = [...currentProductArray];
    switch (soryBy) {
      case 1:
        sortedArray.sort((itemOne, itemTwo) => {
          const priceA = itemOne.price; // ignore upper and lowercase
          const priceB = itemTwo.price; // ignore upper and lowercase
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        break;
      case 2:
        sortedArray.sort((itemOne, itemTwo) => {
          const priceA = itemOne.price; // ignore upper and lowercase
          const priceB = itemTwo.price; // ignore upper and lowercase
          if (priceB < priceA) {
            return -1;
          }
          if (priceB > priceA) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        break;
      case 3:
        sortedArray.sort((itemOne, itemTwo) => {
          const nameA = itemOne.name.toUpperCase(); // ignore upper and lowercase
          const nameB = itemTwo.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        break;
    }

    setCurrentProducts(sortedArray);
  };

  const handleClose = () => {
    setShowProductViewModal(false);
  };

  return (
    <Layout>
      <Container fluid>
        <Toastmessage
          show={showToast}
          onClose={toggleShowToast}
          delay={2000}
        ></Toastmessage>
        <Row className="nav-breadcrumb-container mt-4 mt-md-0 mb-2">
          <Col className="d-flex justify-content-start align-items-center">
            <div className="breadcrumb">
              <ul className="breadCrumb-list">
                <li>
                  {" "}
                  <a href="/">home</a>
                </li>
                {breadCrumbArray.length > 0
                  ? renderBreadCrumb(breadCrumbArray)
                  : null}
              </ul>
            </div>
          </Col>
          <Col className="d-none d-md-flex align-items-center justify-content-end">
            <div className="orderby">
              <Dropdown align="end">
                <Dropdown.Toggle variant="secondary">
                  DISPLAY ITEM BY
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      sortItems(currentProducts, 1);
                    }}
                  >
                    LOW TO HIGH
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      sortItems(currentProducts, 2);
                    }}
                  >
                    HIGH TO LOW
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      sortItems(currentProducts, 3);
                    }}
                  >
                    ALPHABET
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Container className="display-product-container">
              {!error ? renderProductCard() : renderErrorMessage()}
            </Container>
          </Col>
        </Row>
      </Container>

      {currentProduct ? (
        <ProductViewModal
          product={currentProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
          setShowToast={setShowToast}
        ></ProductViewModal>
      ) : null}
    </Layout>
  );
};

export default ProductListPage;
