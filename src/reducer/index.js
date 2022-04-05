import { combineReducers } from "redux";
import PostReducer from "./PostReducer.js";

export default combineReducers({
  items: PostReducer
});