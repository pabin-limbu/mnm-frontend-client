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

function ProductDetailsPage(props) {
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();
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
      const payload = props.match.params.slug;
      dispatch(getproductBySlug(payload));
    }
  }, [product.productcurrent]);
  // get products as related product.
  useEffect(() => {
    const realatedProducts = product.products;
    setProducts(realatedProducts);
  }, [product.products]);

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

  return (
    <div>
      <Layout>
        <Row>
          <Col xs={12} md={6}>
            {/* product image */}
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
              <div>
                <h2>{product.productcurrent.name}</h2>
                <div className="d-flex">
                  <p>
                    <del>RS:000</del>
                    <strong className="ms-3 font-weight-bold">
                      RS:{product.productcurrent.price}
                    </strong>
                  </p>
                </div>

                <h6>{product.productcurrent.description}</h6>
              </div>

              <div className="pt-2">
                <p className="mb-0">3 available</p>
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
                  <Button className="productdetails-btnaddtocart">
                    Add to cart
                  </Button>
                </div>
              </div>
              <div className="">
                <div>share buttons</div>
              </div>
            </Container>
          </Col>

          {console.log(products)}
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
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Scroll to top
        </button>
      </Layout>
    </div>
  );
}

export default ProductDetailsPage;
