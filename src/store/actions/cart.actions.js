import { cartConstants } from "./constants";
import store from "../../store";

export const addToCart = (product, newQty = 0) => {
  return async (dispatch) => {
    try {
      //fetching cartitems from store to update the quantity of item if already placed in cart or new item.
      const {
        cart: { cartItems },
      } = store.getState();

      //updating new quantity based on previous quantity for currently selected item.
      const qty = cartItems[product._id]
        ? parseInt(cartItems[product._id].qty + newQty)
        : newQty;
      cartItems[product._id] = { ...product, qty };

      //updating Items new quantity in local storage.
      localStorage.setItem("cart", JSON.stringify(cartItems));

      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });

      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
      return { msg: "success" };
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const removeCartItem = (item) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
    } = store.getState();
    dispatch({ type: cartConstants.DELETE_FROM_CART_REQUEST });
    const { [item._id]: removedProperty, ...remainingItems } = cartItems;
    //update items from localstorage.
    localStorage.setItem("cart", JSON.stringify(remainingItems));

    dispatch({
      type: cartConstants.DELETE_FROM_CART_SUCCESS,
      payload: { remainingItems },
    });

    //delete item from redux store.
  };
};

export const updateCartQuantity = (cartItems) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.UPDATE_CART_REQUEST });

    //update cart in local storage.
    localStorage.setItem("cart", JSON.stringify(cartItems));

    dispatch({
      type: cartConstants.UPDATE_CART_SUCCESS,
      payload: { cartItems },
    });
    console.log(cartItems);
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
