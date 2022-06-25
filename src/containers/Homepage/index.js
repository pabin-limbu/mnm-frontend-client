import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/UI/banner";

import CarouselSlick from "../../components/UI/CarouselSlick";
import { useSelector } from "react-redux";
import ProductViewModal from "../../components/UI/modal/productViewModal";

import { getFeaturedProductByCategory } from "../../store/actions";
import { useDispatch } from "react-redux";

import "./style.css";

import ProductCollage from "../../components/UI/ProdutcCollage";
import CommentCarouusel from "../../components/UI/CommentCarousel";
import Toastmessage from "../../components/UI/ToastMessage";
import { FormControl, InputGroup } from "react-bootstrap";

const HomePage = (props) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showProductViewModal, setShowProductViewModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const featuredProduct = useSelector((state) => state.product.featuredProduct);
  const featuredCategory = useSelector(
    (state) => state.category.featuredcategories
  );
  const featuredCategoryWithProduct = useSelector(
    (state) => state.product.featuredCategoryWithProduct
  );

  const bannerList = useSelector((state) => state.banner.banners);
  const commentList = useSelector((state) => state.comment.comments);

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
  const toggleShowToast = () => setShowToast(!showToast);
  return (
    <div id="homepage" className="homepage">
      <Layout {...props}>
        
        <Toastmessage
          show={showToast}
          onClose={toggleShowToast}
          delay={2000}
        ></Toastmessage>

        {/* Product banner */}
        {bannerList.length > 0 && <Banner bannerList={bannerList}></Banner>}

        <CarouselSlick
          featured
          {...props}
          products={featuredProduct}
          setShowProductViewModal={setShowProductViewModal}
          carouselCategoryname={"featured Products"}
          setCurrentProduct={setCurrentProduct}
          setShowToast={setShowToast}
        ></CarouselSlick>

        {/* //featured categories */}
        {featuredCategoryWithProduct &&
          featuredCategoryWithProduct.map((category) => {
            return (
              <ProductCollage
                {...props}
                key={category.name}
                products={category.product}
                setShowProductViewModal={setShowProductViewModal}
                carouselCategoryname={category.name}
                carouselCategorySlug={category.slug}
                setCurrentProduct={setCurrentProduct}
                setShowToast={setShowToast}
              ></ProductCollage>
            );
          })}

        <ProductViewModal
          product={currentProduct}
          show={showProductViewModal}
          handleClose={handleClose}
          size={"lg"}
          setShowToast={setShowToast}
        ></ProductViewModal>

        <CommentCarouusel commentList={commentList}></CommentCarouusel>
      </Layout>
    </div>
  );
};

export default HomePage;
