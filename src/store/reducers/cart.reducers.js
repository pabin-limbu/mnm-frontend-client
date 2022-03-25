import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.UPDATE_CART_REQUEST:
      console.log("update requested");
      break;
    case cartConstants.UPDATE_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };

      break;

    case cartConstants.DELETE_FROM_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.remainingItems,
        updatingCart: false,
      };

      break;
  }

  return state;
};
