import RootReducer from "./reducer/RootReducer";
import { createStore } from "redux";
// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
//
// export const store = createStore(RootReducer, applyMiddleware(logger));
export const store = createStore(RootReducer);
