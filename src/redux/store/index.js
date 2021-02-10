import { createStore, applyMiddleware } from "redux";
import combineReducers from "../reducers/index";
import thunk from "redux-thunk";

export default createStore(
   combineReducers,
   applyMiddleware(thunk),
);