import axiosInstance from "../../helpers/axios";
import { productConstaints } from "./constants";
export const getproductBySlug = (slug) => {
  return async (dispatch) => {
    //console.log("hello");
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
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
export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { categoryId, type } = payload;
    const res = await axiosInstance.get(`/page/${categoryId}/${type}`);
    if (res.status === 200) {
      console.log({ res });
    } else {
      console.log("nothing found");
      //error handlling
    }
  };
};
