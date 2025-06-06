import { FC } from "react";

const spacer: FC<SpacerProps> = ({ width = "1px", height = "1px" }) => {
  return <div style={{ width: width, height: height }}></div>;
};

export default spacer;
