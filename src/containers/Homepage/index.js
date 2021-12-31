import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/UI/banner";
import ItemCards from "../../components/UI/Cards/ItemCards";
import CarouselSlick from "../../components/UI/CarouselSlick";
import { useSelector } from "react-redux";
import ProductViewModal from "../../components/UI/modal/productViewModal";
import axiosInstance from "../../helpers/axios";
import { getFeaturedProductByCategory } from "../../store/actions";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "./style.css";
import { Container } from "react-bootstrap";
import ProductCollage from "../../components/UI/ProdutcCollage";

const HomePage = (props) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const dispatch = useDispatch();
  const featuredProduct = useSelector((state) => state.product.featuredProduct);
  const featuredCategory = useSelector(
    (state) => state.category.featuredcategories
  );
  const featuredCategoryWithProduct = useSelector(
    (state) => state.product.featuredCategoryWithProduct
  );

  const handleClose = () => {
    setShowProductViewModal(false);
  };
  useEffect(() => {
    //get featured category with product
    dispatch(getFeaturedProductByCategory(featuredCategory));
  }, [featuredCategory]);

  // //just for test
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  // console.log(props);

  return (
    <div style={{}}>
      <Layout {...props}>
        <Banner></Banner>

        <CarouselSlick
          products={featuredProduct}
          setShowProductViewModal={setShowProductViewModal}
          carouselCategoryname={"featured Products"}
          setCurrentProduct={setCurrentProduct}
        ></CarouselSlick>

        {/* //featured categories */}
        {featuredCategoryWithProduct &&
          featuredCategoryWithProduct.map((category) => {
            return (
              <ProductCollage
                key={category.name}
                products={category.product}
                setShowProductViewModal={setShowProductViewModal}
                carouselCategoryname={category.name}
                setCurrentProduct={setCurrentProduct}
              ></ProductCollage>
            );
          })}

        {/* <CarouselSlick
                products={category.product}
                setShowProductViewModal={setShowProductViewModal}
                carouselCategoryname={category.name}
                setCurrentProduct={setCurrentProduct}
              ></CarouselSlick> */}

        <ProductViewModal
          product={currentProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
        ></ProductViewModal>
        <button
          onClick={() => {
            //  console.log(currentProduct);
          }}
        >
          show
        </button>
        {/* <button
          onClick={async () => {
            let result = await axiosInstance.post(
              "/products/productsbycategoryid",
              {
                featuredCategory,
              }
            );
            //console.log(result);
          }}
        >
          TEST API
        </button> */}
      </Layout>
    </div>
  );
};

export default HomePage;
