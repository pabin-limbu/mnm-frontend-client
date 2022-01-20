import { orderConstants } from "./constants";
import axiosInstance from "../../helpers/axios";
export const addOrder = (payload) => {
  return async (dispatch) => {
    console.log("reached order action");
    //call order api
    const res = await axiosInstance.post("/users/makeorder", payload);
    console.log({ res });
    // dispatch({ type: orderConstants.ADD_OREDER_SUCCESS, payload: { order } });
  };
};
