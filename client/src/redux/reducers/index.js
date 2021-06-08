import { combineReducers } from "redux";
import user from "./userReducer";
import product from "./productsReducer";

const rootReducer = combineReducers({
  user,
  product
});

export default rootReducer;
