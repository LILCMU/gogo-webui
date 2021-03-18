import { CSSProperties, FC, ReactNode, useEffect } from "react";
import { connect } from "react-redux";

import { useDrag, DragSourceMonitor } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { ItemTypes } from "./ItemTypes";

const getStyles: (
  left: number,
  top: number,
  isDragging: boolean
) => CSSProperties = (left, top, isDragging) => {
  const transform = `translate(${left}px,${top}px)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0.25 : 1,
    height: isDragging ? 0 : "",
    zIndex: 100,
  };
};

interface DraggableBoxProps {
  id: string;
  item: ReactNode;
  left: number;
  top: number;
  editing: boolean;
  gridSize: GridSize;
}

const DraggableBox: FC<DraggableBoxProps> = (props) => {
  const { id, item, left, top, editing, gridSize } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      item: { type: ItemTypes.BOX, id, left, top, item },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, item]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  });

  return (
    <div
      ref={editing ? drag : null}
      style={getStyles(
        left * gridSize.width,
        top * gridSize.height,
        isDragging
      )}
    >
      {item}
    </div>
  );
};

const mapStateToProps = (state: AppStateProps, ownProps: any) => ({
  gridSize: state.widget.gridSize,
  ...ownProps,
});

export default connect(mapStateToProps)(DraggableBox);
