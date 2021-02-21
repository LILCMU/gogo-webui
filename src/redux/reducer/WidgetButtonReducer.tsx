import { AnyAction } from "redux";
import { ADD, EDIT, REMOVE } from "../actions/WidgetButtonActions";
import { initialState } from "../init/WidgetState";

const WidgetButtonReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD:
      return { ...state };
    case EDIT:
      const { index, widget } = action.payload;
      const new_state = state;
      // if(widget.type==='pad'){
      //   new_state[action.payload.index] = {}
      // }
      new_state[index] = widget;
      return new_state;
    case REMOVE:
      return { ...state };

    default:
      return state;
  }
};

export default WidgetButtonReducer;
