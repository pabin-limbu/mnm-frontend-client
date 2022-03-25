import { productConstaints } from "../actions/constants";

const initState = {
  products: [],
  productcurrent: {},
  featuredProduct: [],
  featuredCategoryWithProduct: [],
  relatedProduct: [],
};
export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case productConstaints.GET_PRODUCTS_BY_SLUG:
      console.log("getting product by slug");
      console.log(action.payload.products)
      state = {
        ...state,
        products: action.payload.products,
      };

      break;
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

    default:
      break;
  }

  return state;
};
