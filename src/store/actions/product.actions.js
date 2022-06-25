import axiosInstance from "../../helpers/axios";
import { productConstaints } from "./constants";

//v1.category based product fetch.
export const getproductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
      console.log("product action - get by slug");
      dispatch({
        type: productConstaints.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      console.log("nothing found");
    }
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
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstaints.GET_ALL_PRODUCT_REQUEST });
      const res = await axiosInstance.get("/product/getall");

      if (res.status == 200) {
        dispatch({
          type: productConstaints.GET_ALL_PRODUCT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productConstaints.GET_ALL_PRODUCT_FAILURE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
