import { orderConstants } from "./constants";
import axiosInstance from "../../helpers/axios";
export const addOrder = (payload) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/order/makeorder", payload);
    if (res.status == 200) {
      dispatch({ type: orderConstants.ADD_OREDER_SUCCESS, payload: res.data });
    }
    return res;
  };
};

export const getOrderById = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GET_ORDER_REQUEST });
      const res = await axiosInstance.get("/order/getorderbyid", {
        params: { orderId },
      });

      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: orderConstants.GET_ORDER_SUCCESS,
          payload: { data: res.data },
        });
      }

      if (res.status !== 200) {
        dispatch({
          type: orderConstants.GET_ORDER_FAILURE,
          payload: "Cannot fetch data !",
        });
      }
    } catch (error) {
      dispatch({ type: orderConstants.GET_ORDER_FAILURE, payload: { error } });
    }
  };
};
