import { productConstaints } from "../actions/constants";

const initState = {
  products: [],
  featuredProduct: [],
  featuredCategoryWithProduct: [],
};
export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case productConstaints.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
      };

      break;
    case productConstaints.GET_FEATURED_PRODUCT_SUCCESS:
      state = { ...state, featuredProduct: action.payload.products };
      break;
    case productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_REQUEST:
      state = { ...state };
      break;
    case productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_SUCCESS:
      state = { ...state, featuredCategoryWithProduct: action.payload };
      break;
    case productConstaints.GET_FEATURED_PRODUCT_BY_CATEGORY_FAILURE:
      state = { ...state };
      break;

    default:
      break;
  }

  return state;
};
