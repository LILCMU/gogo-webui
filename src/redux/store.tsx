// import { createStore } from "redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import RootReducer from "./reducer/RootReducer";

export const store = createStore(RootReducer, applyMiddleware(logger));
// export const store = createStore(RootReducer);
