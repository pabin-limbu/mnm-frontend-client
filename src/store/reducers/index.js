//root reducer
import { combineReducers } from "redux";
import categoryRecucer from "./category.reducers";
import productReducer from "./product.reducers";
import cartReducers from "./cart.reducers";

const rootReducer = combineReducers({
  category: categoryRecucer,
  product: productReducer,
  cart: cartReducers,
});

export default rootReducer;
