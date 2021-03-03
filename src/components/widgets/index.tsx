import { BoxMap } from "../DragLayer/Container";
// import { CommonButton, Pad, Status } from ".";
import CommonButton from "./CommonButton";
import Pad from "./Pad";
import Status from "./Status";

export { CommonButton, Pad, Status };

type renderType = (
  widget: AllWidgetButtonProps,
  editing: boolean,
  gridSize: GridSize
) => BoxMap;

export const renderWidget: renderType = (widget, editing, gridSize) => {
  const { type, position } = widget;
  switch (type) {
    case "common":
      return {
        ...position,
        item: (
          <CommonButton
            {...(widget as CommonButtonProps)}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };
    case "pad":
      return {
        ...position,
        item: (
          <Pad
            {...(widget as PadProps)}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };
    case "status":
      return {
        ...position,
        item: (
          <Status
            {...(widget as StatusProps)}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };
    default:
      return { ...position, item: null };
  }
};
