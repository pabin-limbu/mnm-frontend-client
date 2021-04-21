import { productConstaints } from "../actions/constants";

const initState = { products: [] };
export default (state = initState, action) => {
  switch (action.type) {
    case productConstaints.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
      };

      break;

    default:
      break;
  }

  return state;
};
