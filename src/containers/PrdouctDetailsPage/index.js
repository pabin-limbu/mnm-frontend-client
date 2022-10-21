import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import {
  getProductById,
  getproductBySlug,
} from "../../store/actions/product.actions";
import {
  Image,
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import CarouselSlick from "../../components/UI/CarouselSlick";
import "./style.css";
import ProductViewModal from "../../components/UI/modal/productViewModal";
import { generatePublicUrl } from "../../urlConfig";
import Toastmessage from "../../components/UI/ToastMessage";
import { addToCart } from "../../store/actions";
import { BsChevronDoubleUp } from "react-icons/bs";
import { IconContext } from "react-icons";

function ProductDetailsPage(props) {
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToTopButton, setShowToTopButton] = useState(false);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  //logs
  console.log(currentProduct);

  //get product in state.
  useEffect(() => {
    const payload = props.match.params.id;
    dispatch(getProductById(payload));
    window.scrollTo({
      top: 30,
      left: 0,
      behavior: "smooth",
    });
  }, [props.match.params]);

  // get related product by category.
  useEffect(() => {
    if (Object.keys(product.productcurrent).length !== 0) {
      //currentproduct set
      setCurrentProduct(product.productcurrent);
      //fetch related product using
      const payload = props.match.params.slug;
      dispatch(getproductBySlug(payload));
    }
  }, [product.productcurrent]);

  // get products as related product.
  useEffect(() => {
    const realatedProducts = product.products;
    setProducts(realatedProducts);
  }, [product.products]);

  //event handle to hide and show toTop button.
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      setShowToTopButton(true);
    } else {
      setShowToTopButton(false);
    }
  });

  const increamentQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity == 0) return;
    setQuantity(quantity - 1);
  };
  const handleClose = () => {
    setShowProductViewModal(false);
  };

  const handleAddToCart = () => {
    const orderItem = {
      _id: currentProduct._id,
      name: currentProduct.name,
      category: currentProduct.category,
      price: currentProduct.price,
      quantity: currentProduct.quantity,
      productPictures: currentProduct.productPictures,
    };

    dispatch(addToCart(orderItem, quantity)).then((res) => {
      console.log(res);
      setShowToast(true);
    });
  };

  const toggleShow = () => {
    setShowToast(!showToast);
  };

  return (
    <div>
      <Layout {...props}>
        <Toastmessage
          show={showToast}
          onClose={toggleShow}
          delay={2000}
        ></Toastmessage>

        <Container>
          <Row>
            <Col xs={12} md={6} className="mt-2 mb-2">
              <div className="productdetail-imgcontainer">
                {Object.keys(product.productcurrent).length !== 0 ? (
                  <Image
                    src={generatePublicUrl(
                      product.productcurrent.productPictures[0].img
                    )}
                    fluid
                  ></Image>
                ) : null}
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Container>
                <div className="product-description-container">
                  <h2>{product.productcurrent.name}</h2>
                  <div className="d-flex">
                    <p>
                      <del>RS:000</del>
                      <strong className="ms-3 font-weight-bold">
                        RS:{product.productcurrent.price}
                      </strong>
                    </p>
                  </div>
                  <div>
                    <p>{product.productcurrent.description}</p>
                  </div>
                </div>

                <div className="">
                  <p className="mb-3" id="quantity-mark">
                    {" "}
                    {currentProduct && currentProduct.quantity} available
                  </p>
                </div>
                <div className="d-flex">
                  <InputGroup className="mb-3 product-details-quantity">
                    <Button
                      variant="outline-secondary"
                      id="button-addon1"
                      onClick={decrementQuantity}
                    >
                      -
                    </Button>
                    <FormControl
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      readOnly
                      value={quantity}
                    />
                    <Button
                      variant="outline-secondary"
                      id="button-addon2"
                      onClick={increamentQuantity}
                    >
                      +
                    </Button>
                  </InputGroup>

                  <div className="productdetails-addtocart-container">
                    <Button
                      className="productdetails-btnaddtocart"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
                <div className="">
                  <div>share buttons</div>
                </div>
              </Container>
            </Col>

            <Col xs={12}>
              {/* Related product */}
              <div>
                {products.length > 0 &&
                Object.keys(product.productcurrent).length !== 0 ? (
                  <CarouselSlick
                    {...props}
                    products={products}
                    carouselCategorySlug={product.productcurrent.category.slug}
                    setShowProductViewModal={setShowProductViewModal}
                    carouselCategoryname={"Related Products"}
                    setCurrentProduct={setCurrentProduct}
                  ></CarouselSlick>
                ) : null}
              </div>
            </Col>
          </Row>

          {currentProduct ? (
            <ProductViewModal
              product={currentProduct}
              show={showProductViewModal}
              handleClose={handleClose}
              size={"lg"}
            ></ProductViewModal>
          ) : null}

          {showToTopButton && (
            <button
              id="btn-scrolltotop"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <IconContext.Provider
                value={{
                  color: "",
                  className: "top-icon",
                  size: "1.5em",
                }}
              >
                <BsChevronDoubleUp />
              </IconContext.Provider>
            </button>
          )}
        </Container>
      </Layout>
    </div>
  );
}

export default ProductDetailsPage;

//TASK
// get cart items and compare it with current item- if match get quentity else start from 0.
