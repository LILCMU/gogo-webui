import { combineReducers } from "redux";
import WidgetButtonReducer from "./WidgetButtonReducer";
import MqttReducer from "./MqttReducer";
import { firebaseReducer } from "react-redux-firebase";

const RootReducer = combineReducers({
  widget: WidgetButtonReducer,
  mqtt: MqttReducer,
  firebase: firebaseReducer,
});
export default RootReducer;
