//root reducer
import { combineReducers } from "redux";
import categoryRecucer from "./category.reducers";
import productReducer from "./product.reducers";

const rootReducer = combineReducers({
  category: categoryRecucer,
  product: productReducer,
});

export default rootReducer;
