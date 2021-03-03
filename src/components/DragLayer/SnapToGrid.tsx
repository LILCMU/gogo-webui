type SnapType = (
  x: number,
  y: number,
  roundX: number,
  roundY: number
) => [number, number];

const SnapToGrid: SnapType = (x, y, roundX, roundY) => {
  const snappedX = Math.round(x / roundX) * roundX;
  const snappedY = Math.round(y / roundY) * roundY;
  return [snappedX, snappedY];
};

export default SnapToGrid;
