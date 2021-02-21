import { combineReducers } from "redux";
import WidgetButtonReducer from "./WidgetButtonReducer";
import MqttReducer from "./MqttReducer";

const RootReducer = combineReducers({
  widgets: WidgetButtonReducer,
  mqtt: MqttReducer,
});
export default RootReducer;
