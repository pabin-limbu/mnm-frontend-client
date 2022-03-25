import axiosInstance from "../../helpers/axios";
import { productConstaints } from "./constants";

//v1.category based product fetch.
export const getproductBySlug = (slug) => {
  return async (dispatch) => {
    //Fetch all product which lies under same category slug. Based on Category slug -- used in categry list page.
    // const res = await axiosInstance.get(`/products/${slug}`);
    // if (res.status === 200) {
    //   dispatch({
    //     type: productConstaints.GET_PRODUCTS_BY_SLUG,
    //     payload: res.data,
    //   });
    // } else {
    //   console.log("nothing found");
    //   //error handlling
    // }
    const res = await axiosInstance.get(`/products/${slug}`);

    if (res.status === 200) {
      console.log("result passed");
      console.log({ res });
      dispatch({
        type: productConstaints.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      console.log("nothing found");
      //error handlling
    }
  };
};
//v2. getproductbyslug --alsoo fetch the children category product.

export const getproductBySlugIncludeChildrenCategory = (slug) => {
  //This function return product based on category and also check for product in children category.
  return async (dispatch) => {
    // const res = await axiosInstance.get(`/products/${slug}`);
    // console.log({ res });
    // if (res.status === 200) {
    //   dispatch({
    //     type: productConstaints.GET_PRODUCTS_BY_SLUG,
    //     payload: res.data,
    //   });
    // } else {
    //   console.log("nothing found");
    //   //error handlling
    // }
  };
};

//Individual product fetch based on iD of category.
export const getProductById = (productId) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/products/productbyid/${productId}`);
    if (res.status === 200) {
      dispatch({
        type: productConstaints.GET_PRODUCTS_BY_ID,
        payload: res.data,
      });
    } else {
      console.log("no data found");
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { categoryId, type } = payload;
    const res = await axiosInstance.get(`/page/${categoryId}/${type}`);
    if (res.status === 200) {
      //  console.log({ res });
    } else {
      console.log("nothing found");
      //error handlling
    }
  };
};

//get featured product by category.
export const getFeaturedProductByCategory = (categories) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_REQUEST,
      });
      const res = await axiosInstance.post("/products/productsbycategoryid", {
        featuredCategory: categories,
      });

      if (res.status == 200) {
        dispatch({
          type: productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_FAILURE,
        });
        console.log("NP RESPONCE product.action");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
