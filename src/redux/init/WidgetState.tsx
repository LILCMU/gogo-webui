const pad1: PadProps = {
  type: "pad",
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  size: "30vh",
};

const StartButton: CommonButtonProps = {
  type: "common",
  text: "Start",
  color: "#2ecc71",
  textColor: "white",
};

const StopButton: CommonButtonProps = {
  type: "common",
  text: "Stop",
  color: "#e74c3c",
  textColor: "white",
};

const led: StatusProps = {
  type: "status",
  text: "led",
};

export const initialState: WidgetsStateProps = [
  pad1,
  StartButton,
  StopButton,
  led,
];
