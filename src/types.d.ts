type WidgetType = "pad" | "common" | "status" | "toggle" | "display" | "input";

interface WidgetButton {
  type: WidgetType;
  color?: string;
  disable?: boolean;
  position: {
    top: number;
    left: number;
  };
  size: {
    width: number;
    height: number;
  };
}

interface SpacerProps {
  width?: string;
  height?: string;
}

interface CommonButtonProps extends WidgetButton {
  text: string;
  color?: string;
  textColor?: string;
}

interface PadProps extends WidgetButton {
  up: string;
  down: string;
  left: string;
  right: string;
}

interface StatusProps extends WidgetButton {
  text: string;
}

interface ToggleProps extends CommonButtonProps {}
interface DisplayProps extends CommonButtonProps {}
interface InputProps extends CommonButtonProps {}

type AllWidgetButtonProps = CommonButtonProps | PadProps | StatusProps;

// type WidgetsStateProps = { [index: number]: AllWidgetButtonProps };

type GridSize = {
  width: number;
  height: number;
};

interface Project {
  name: string;
  key: string;
  description: string;
}

interface SavedProject extends Project {
  widgets: Array<AllWidgetButtonProps>;
  channel: string;
}

type WidgetsStateProps = {
  widgets: Array<AllWidgetButtonProps>;
  gridSize: GridSize;
  project?: Project;
};

type MqttStateProps = {
  client: MqttClient;
  prefix: string;
  defaultPayload: string;
  channel: string;
};

type AppStateProps = {
  widget: WidgetsStateProps;
  mqtt: MqttStateProps;
  firebase: ExtendedFirebaseInstance;
};

type ProfileProps = {
  displayName: string;
  uid: string;
  email: string;
  photoUrl: string;
  providerId: string;
};
