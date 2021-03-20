import { CSSProperties, FC } from "react";
import { connect } from "react-redux";

import { XYCoord, useDragLayer, DragLayerMonitor } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import SnapToGrid from "./SnapToGrid";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

const DragPreviewLayer: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const getItemStyles: (
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null
  ) => CSSProperties = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
      return { display: "none" };
    }

    let { x, y } = currentOffset;
    // snap to grid
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = SnapToGrid(x, y, width, height);
    x += initialOffset.x;
    y += initialOffset.y;

    const transform = `translate(${x}px,${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  };

  const {
    item,
    itemType,
    initialOffset,
    currentOffset,
    isDragging,
  } = useDragLayer((monitor: DragLayerMonitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    switch (itemType) {
      case ItemTypes.BOX:
        return item.item;
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateProps) => {
  const { width, height } = state.widget.gridSize;
  return { width, height };
};

export default connect(mapStateToProps)(DragPreviewLayer);
