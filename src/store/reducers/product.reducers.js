import { productConstaints } from "../actions/constants";

const initState = {
  allProducts: [],
  products: [],
  productcurrent: {},
  featuredProduct: [],
  featuredCategoryWithProduct: [],
  relatedProduct: [],
  productsLoading: false,
  error: "",
};
export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case productConstaints.GET_PRODUCTS_BY_SLUG_REQUEST:
      state = { ...state, productsLoading: true, error: "" };
      break;
    case productConstaints.GET_PRODUCTS_BY_SLUG_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        productsLoading: false,
        error: "",
      };
      break;
    case productConstaints.GET_PRODUCTS_BY_SLUG_FAILURE:
      state = {
        ...state,
        productsLoading: false,
        error: action.payload.response.data.message,
      };

    case productConstaints.GET_PRODUCTS_BY_ID:
      state = { ...state, productcurrent: action.payload.data };
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
    case productConstaints.GET_ALL_PRODUCT_SUCCESS:
      state = { ...state, allProducts: action.payload.data };

    default:
      break;
  }

  return state;
};
