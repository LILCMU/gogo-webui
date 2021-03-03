interface WidgetButton extends PropsWithChildren {
  type: "pad" | "common" | "status";
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

type AllWidgetButtonProps = CommonButtonProps | PadProps | StatusProps;

// type WidgetsStateProps = { [index: number]: AllWidgetButtonProps };

type GridSize = {
  width: number;
  height: number;
};

type WidgetsStateProps = {
  widgets: Array<AllWidgetButtonProps>;
  gridSize: GridSize;
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
};
