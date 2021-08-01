import { cartConstants } from "./constants";
import store from "../../store";

export const addToCart = (product, newQty = 0) => {
  return async (dispatch) => {
    const {
      cart,
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = { ...product, qty }; 

    dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log(cartItems);
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};
export const updateCart = () => {
  return async (dispatch) => {
    const { cart } = store.getState();
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};


const getCartItems = () => {};
