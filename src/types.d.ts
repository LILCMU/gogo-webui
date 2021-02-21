interface WidgetButton extends PropsWithChildren {
  type: "pad" | "common" | "status";
  color?: string;
  disable?: boolean;
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
  size?: string;
}

interface StatusProps extends WidgetButton {
  text: string;
}

type AllWidgetButtonProps = CommonButtonProps | PadProps | StatusProps;

type WidgetsStateProps = { [index: number]: AllWidgetButtonProps };

type MqttStateProps = {
  client: MqttClient;
  prefix: string;
  defaultPayload: string;
  channel: string;
};
