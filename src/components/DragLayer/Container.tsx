import {
  CSSProperties,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { DropTargetMonitor, useDrop } from "react-dnd";

import {
  edit,
  EditType,
  change_grid_size,
  ChangeGridSizeType,
} from "src/redux/actions/WidgetButtonActions";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import { useTheme } from "@material-ui/core";
// import { renderWidget } from "../widgets";
import RenderWidget from "../widgets";
import DragGrid from "./DragGrid";
import SnapToGrid from "./SnapToGrid";
import { renderContext } from ".";

export interface BoxMap {
  top: number;
  left: number;
  item: ReactElement;
}

interface DragItem {
  id: string;
  type: string;
  left: number;
  top: number;
}

interface ContainerProps {
  widget: WidgetsStateProps;
  editing: boolean;
  edit: EditType;
  change_grid_size: ChangeGridSizeType;
  gridVisible: boolean;
}

const Container: FC<ContainerProps> = ({
  widget,
  editing,
  edit,
  change_grid_size,
  gridVisible,
}) => {
  const { widgets, gridSize } = widget;
  const [boxes, setBoxes] = useState<BoxMap[]>([]);

  const renderer = useContext(renderContext);
  const { render } = renderer;

  useEffect(() => {
    const BoxList: BoxMap[] = widgets.map((widget) =>
      // renderWidget(widget, editing, gridSize)
      ({
        ...widget.position,
        item: (
          <RenderWidget
            widget={widget}
            editing={editing || gridVisible}
            gridSize={gridSize}
          />
        ),
      })
    );
    setBoxes(BoxList);
  }, [editing, gridVisible, widgets, gridSize]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: { $merge: { left, top } },
        })
      );
    },

    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor: DropTargetMonitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };
        const { width, height } = gridSize;

        let left = Math.round(item.left * width + delta.x);
        let top = Math.round(item.top * height + delta.y);

        [left, top] = SnapToGrid(left, top, width, height);

        left = left / width;
        top = top / height;

        moveBox(item.id, left, top);

        const index = parseInt(item.id);
        const { left: pLeft, top: pTop } = widgets[index].position;
        if (left !== pLeft || top !== pTop) {
          edit(widgets[index], { ...widgets[index], position: { left, top } });
          if (render) render();
        }

        return undefined;
      },
    }),
    [moveBox, gridSize]
  );

  const theme = useTheme();

  const styles: CSSProperties = {
    width: "100%",
    position: "relative",
    height: `${
      window.innerHeight -
      (theme.mixins.toolbar.minHeight as number) -
      theme.spacing(1)
    }px`,
    flexGrow: 1,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  };

  return (
    <div style={styles} ref={drop}>
      {boxes.map((widget, index) => {
        return (
          <DraggableBox
            key={index.toString()}
            id={index.toString()}
            {...widget}
            editing={editing}
          />
        );
      })}
      <DragGrid change_grid_size={change_grid_size} visible={gridVisible} />
    </div>
  );
};

const mapStateToProps = (state: AppStateProps, ownProps: any) => {
  const { widget } = state;
  return { widget, ...ownProps };
};

const mapDispatchToProps = {
  edit,
  change_grid_size,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
