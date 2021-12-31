//root reducer
import { combineReducers } from "redux";
import categoryRecucer from "./category.reducers";
import productReducer from "./product.reducers";
import cartReducers from "./cart.reducers";
import checkoutReducers from "./checkout.reducers";

const rootReducer = combineReducers({
  category: categoryRecucer,
  product: productReducer,
  cart: cartReducers,
  checkout: checkoutReducers,
});

export default rootReducer;
