interface ActionButton extends PropsWithChildren {
  type: "pad" | "common" | "status";
  color?: string;
  disable?: boolean;
}

interface SpacerProps {
  width?: string;
  height?: string;
}

interface CommonButtonProps extends ActionButton {
  text: string;
  color?: string;
  textColor?: string;
}

interface PadProps extends ActionButton {
  up: string;
  down: string;
  left: string;
  right: string;
  size?: string;
}

interface StatusProps extends ActionButton {
  text: string;
}

interface AppContext {
  client: MqttClient;
  publish: (topic: string, channel: number) => any;
  subscribe: (
    topic: string,
    fn: (topic: string, message: string) => any
  ) => any;
}
