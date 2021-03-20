import { Resizable, ResizeCallback } from "re-resizable";
import { FC, useCallback, useContext } from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";

import { edit, EditType } from "src/redux/actions/WidgetButtonActions";
import { connect } from "react-redux";
import { renderContext } from "../DragLayer";

interface ResizeProps {
  widget: AllWidgetButtonProps;
  gridSize: GridSize;
  editing: boolean;
  edit: EditType;
}

const Resize: FC<ResizeProps> = (props) => {
  const { children, widget, gridSize, editing, edit } = props;
  const { type, color } = widget;

  const { width, height } = widget.size;

  // const [size, setSize] = useState(widget.size);

  const renderer = useContext(renderContext);

  const { render } = renderer;

  const onResizeStop: ResizeCallback = useCallback(
    (_, direction, __, delta) => {
      let size = { width, height };
      switch (direction) {
        case "right":
          // setSize({
          //   width: width + Math.round(delta.width / gridSize.width),
          //   height,
          // });
          size = {
            width: width + Math.round(delta.width / gridSize.width),
            height,
          };
          break;
        case "bottom":
          // setSize({
          //   width: width,
          //   height: height + Math.round(delta.height / gridSize.height),
          // });
          size = {
            width: width,
            height: height + Math.round(delta.height / gridSize.height),
          };
          break;
        case "bottomRight":
          // setSize({
          //   width: width + Math.round(delta.width / gridSize.width),
          //   height: height + Math.round(delta.height / gridSize.height),
          // });

          size = {
            width: width + Math.round(delta.width / gridSize.width),
            height: height + Math.round(delta.height / gridSize.height),
          };
          break;
      }
      edit(widget, { ...widget, size });
      if (render) render();
    },
    [gridSize.height, gridSize.width, edit, render, width, height, widget]
  );

  return (
    <Resizable
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
      }}
      size={{ width: width * gridSize.width, height: height * gridSize.height }}
      enable={{
        right:
          editing && type !== "pad" && type !== "status" && type !== "toggle",
        bottom:
          editing &&
          type !== "pad" &&
          type !== "status" &&
          type !== "toggle" &&
          type !== "input",
        bottomRight: editing && type !== "input",
      }}
      lockAspectRatio={type === "pad" || type === "status" || type === "toggle"}
      handleStyles={{
        right: {
          display: "flex",
          alignItems: "center",
          color: color,
          zIndex: 999,
        },
        bottom: {
          display: "flex",
          justifyContent: "center",
          color: color,
          zIndex: 999,
        },
        bottomRight: {
          paddingTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "rotate(-45deg)",
          color: color,
          zIndex: 999,
        },
      }}
      handleComponent={{
        right: <KeyboardArrowRight fontSize="large" />,
        bottom: <KeyboardArrowDown fontSize="large" />,
        bottomRight: <KeyboardArrowDown fontSize="large" />,
      }}
      grid={[gridSize.width, gridSize.height]}
      onResizeStop={onResizeStop}
    >
      {children}
    </Resizable>
  );
};

const mapStateToProps = (_state: AppStateProps, ownProps: any) => ({
  ...ownProps,
});

const mapDispatchToProps = { edit };

export default connect(mapStateToProps, mapDispatchToProps)(Resize);
