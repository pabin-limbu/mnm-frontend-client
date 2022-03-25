import axiosInstance from "../../helpers/axios";
import {
  productConstaints,
  categoryConstant,
  bannerConstaints,
  commentConstaints,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    //getFeaturedProducts.
    dispatch({ type: productConstaints.GET_FEATURED_PRODUCT_REQUEST });
    try {
      const res = await axiosInstance.get("/products/featured");
      if (res.status === 200) {
        const products = res.data.product;
        dispatch({
          type: productConstaints.GET_FEATURED_PRODUCT_SUCCESS,
          payload: { products },
        });
      }
    } catch (error) {
      dispatch({ type: productConstaints.GET_FEATURED_PRODUCT_FAILURE });
      console.log(error.message);
    }

    //get Featured category
    const getCategoryList = await axiosInstance.get(
      "/category/getcategoryList"
    );
    if (getCategoryList.status === 200) {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORYLIST_SUCCESS,
        payload: {
          categories: getCategoryList.data.categories,
        },
      });
    }

    //get banners
    const getBannerList = await axiosInstance.get("/banner/getbanner");
    if (getBannerList.status === 200) {
      dispatch({
        type: bannerConstaints.GET_BANNER_SUCCESS,
        payload: { banner: getBannerList.data },
      });
    }

    const getCommentList = await axiosInstance.get("/comment/getcomment");
    if (getCommentList.status === 200) {
      dispatch({
        type: commentConstaints.GET_COMMENT_SUCCESS,
        payload: { comment: getCommentList.data },
      });
    }
  };
};
