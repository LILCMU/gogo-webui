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
  let new_widgets;
  switch (action.type) {
    case ADD:
      const added_widgets = state.widgets;
      const add_widget: AllWidgetButtonProps = {
        ...action.payload.widget,
        position: { left: 0, top: 0 },
      };
      added_widgets.push(add_widget);
      return { ...state, widgets: added_widgets };
    case EDIT:
      const { widget, new_widget } = action.payload;
      const index = state.widgets.findIndex((w) => w === widget);

      if (index === -1) {
        return state;
      }
      new_widgets = state.widgets;
      // if(widget.type==='pad'){
      //   new_state[action.payload.index] = {}
      // }
      new_widgets[index] = new_widget;
      return { ...state, widgets: new_widgets };
    case REMOVE:
      new_widgets = state.widgets.filter(
        (_, index) => index !== action.payload.index
      );

      return { ...state, widgets: new_widgets };
    case CHANGE_GRID_SIZE:
      const { width, height } = action.payload;
      return { ...state, gridSize: { width, height } };
    default:
      return state;
  }
};

export default WidgetButtonReducer;
