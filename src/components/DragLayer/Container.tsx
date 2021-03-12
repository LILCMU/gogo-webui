import {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import {
  edit,
  EditType,
  change_grid_size,
  ChangeGridSizeType,
} from "src/redux/actions/WidgetButtonActions";

import { DropTargetMonitor, useDrop } from "react-dnd";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import DraggableBox from "./DraggableBox";
import { useTheme, Grid } from "@material-ui/core";
import { renderWidget } from "../widgets";
import SnapToGrid from "./SnapToGrid";

export interface BoxMap {
  top: number;
  left: number;
  item: ReactNode;
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
}

const Container: FC<ContainerProps> = ({
  widget,
  editing,
  edit,
  change_grid_size,
}) => {
  const { widgets, gridSize } = widget;
  const [boxes, setBoxes] = useState<Array<BoxMap>>([]);

  useEffect(() => {
    const BoxList: Array<BoxMap> = widgets.map((widget) =>
      renderWidget(widget, editing, gridSize)
    );
    setBoxes(BoxList);
  }, [widgets, editing, gridSize]);

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
        edit(index, { ...widgets[index], position: { left, top } });

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
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  };

  return (
    <div style={styles} ref={drop}>
      {/* {widgets.map((widget, index) => {
        const Widget = renderWidget(widget, editing, gridSize);
        return (
          <DraggableBox
            key={index.toString()}
            id={index.toString()}
            {...Widget}
            editing={editing}
          />
        );
      })} */}
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
      <DragGrid change_grid_size={change_grid_size} editing={editing} />
    </div>
  );
};

const DragGrid: FC<{
  change_grid_size: ChangeGridSizeType;
  editing: boolean;
}> = ({ change_grid_size, editing }) => {
  const theme = useTheme();

  const ref = useRef<any>(null);

  useEffect(() => {
    const { offsetWidth, offsetHeight } = ref.current;
    change_grid_size(offsetWidth, offsetHeight);
  }, [ref, change_grid_size]);

  const styles: CSSProperties = {
    backgroundColor: "#333",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    // opacity: 0.25,
    border: "0.5px solid black",
    borderRadius: `${theme.spacing(1)}px`,
    overflow: "hidden",
  };

  return (
    <Grid container style={{ height: "100%", opacity: editing ? 0.25 : 0 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) =>
        isMobile ? (
          <Grid key={index} container item xs={12}>
            <Grid item xs={2} ref={index === 1 ? ref : null} style={styles} />
            <Grid item xs={2} style={styles} />
            <Grid item xs={2} style={styles} />
            <Grid item xs={2} style={styles} />
            <Grid item xs={2} style={styles} />
            <Grid item xs={2} style={styles} />
          </Grid>
        ) : (
          <>
            <Grid key={index} container item xs={6}>
              <Grid
                ref={index === 1 ? ref : null}
                item
                xs={3}
                style={styles}
              ></Grid>
              <Grid item xs={3} style={styles}></Grid>
              <Grid item xs={3} style={styles}></Grid>
              <Grid item xs={3} style={styles}></Grid>
            </Grid>
            <Grid container item xs={6}>
              <Grid item xs={3} style={styles}></Grid>
              <Grid item xs={3} style={styles}></Grid>
              <Grid item xs={3} style={styles}></Grid>
              <Grid item xs={3} style={styles}></Grid>
            </Grid>
          </>
        )
      )}
    </Grid>
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
