import { AnyAction } from "redux";
import {
  ADD,
  EDIT,
  REMOVE,
  CHANGE_GRID_SIZE,
} from "../actions/WidgetButtonActions";
import { initialState } from "../init/WidgetState";

const WidgetButtonReducer = (
  state: WidgetsStateProps = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD:
      return state;
    case EDIT:
      const { index, widget } = action.payload;
      const new_widgets = state.widgets;
      // if(widget.type==='pad'){
      //   new_state[action.payload.index] = {}
      // }
      new_widgets[index] = widget;
      return { ...state, widgets: new_widgets };
    case REMOVE:
      return state;
    case CHANGE_GRID_SIZE:
      const { width, height } = action.payload;
      return { ...state, gridSize: { width, height } };
    default:
      return state;
  }
};

export default WidgetButtonReducer;
