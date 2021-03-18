import { FC, ReactNode } from "react";

import Modal from "../Modal";
import Resizable from "./Resizable";
import CommonButton from "./CommonButton";
import Display from "./Display";
import Input from "./Input";
import Pad from "./Pad";
import Status from "./Status";
import ToggleButton from "./ToggleButton";

interface renderType {
  widget: AllWidgetButtonProps;
  editing: boolean;
  gridSize: GridSize;
}

const RenderWidget: FC<renderType> = (props) => {
  const { widget, editing, gridSize } = props;

  const { type } = widget;

  const getWidget: () => ReactNode = () => {
    switch (type) {
      case "common":
        return (
          <CommonButton
            widget={widget as CommonButtonProps}
            disable={editing}
          />
        );

      case "pad":
        return (
          <Pad
            widget={widget as PadProps}
            disable={editing}
            gridSize={gridSize}
          />
        );

      case "status":
        return (
          <Status
            widget={widget as StatusProps}
            disable={editing}
            gridSize={gridSize}
          />
        );

      case "toggle":
        return (
          <ToggleButton
            widget={widget as ToggleProps}
            disable={editing}
            gridSize={gridSize}
          />
        );

      case "display":
        return <Display widget={widget as ToggleProps} disable={editing} />;

      case "input":
        return (
          <Input
            widget={widget as InputProps}
            disable={editing}
            gridSize={gridSize}
          />
        );
    }
  };

  return (
    <Resizable widget={widget} gridSize={gridSize} editing={editing}>
      {editing ? (
        <Modal widget={widget} style={{ width: "100%", height: "100%" }}>
          {getWidget()}
        </Modal>
      ) : (
        getWidget()
      )}
    </Resizable>
  );
};

export default RenderWidget;
