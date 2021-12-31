import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
     // console.log("Hi");
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
  }

  return state;
};
