import axiosinstance from "../../helpers/axios";
import { categoryConstant } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });
    const res = await axiosinstance.get("/category/getcategory");
    //console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const getAllCategoryList = () => {
  return async (dispatch) => {
    const res = await axiosinstance.get("/category/getcategoryList");

    dispatch({
      type: categoryConstant.GET_ALL_CATEGORYLIST_SUCCESS,
      payload: {
        categories: res.data.categories,
      },
    });
  };
};
