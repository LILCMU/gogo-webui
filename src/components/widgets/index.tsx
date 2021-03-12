import { BoxMap } from "../DragLayer/Container";
// import { CommonButton, Pad, Status } from ".";
import CommonButton from "./CommonButton";
import Display from "./Display";
import Input from "./Input";
import Pad from "./Pad";
import Status from "./Status";
import ToggleButton from "./ToggleButton";

export { CommonButton, Pad, Status, ToggleButton };

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
            widget={widget as CommonButtonProps}
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
            widget={widget as PadProps}
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
            widget={widget as StatusProps}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };
    case "toggle":
      return {
        ...position,
        item: (
          <ToggleButton
            widget={widget as ToggleProps}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };
    case "display":
      return {
        ...position,
        item: (
          <Display
            widget={widget as ToggleProps}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };

    case "input":
      return {
        ...position,
        item: (
          <Input
            widget={widget as InputProps}
            disable={editing}
            gridSize={gridSize}
          />
        ),
      };

    default:
      return { ...position, item: null };
  }
};
