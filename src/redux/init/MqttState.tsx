import mqtt, { IClientOptions } from "mqtt";

const brokerUrl: string =
  window.location.protocol === "https:"
    ? "wss://remotelab-broker.gogoboard.org:8443/mqtt"
    : "ws://message-broker.gogoboard.org:8083/mqtt";

const prefix: string = "GoGoBoard/BroadcastT";
const defaultPayload: string = "gogoBroadcastMQTT!@LILCMU";
const channel: string = "0";

const options: IClientOptions = {
  reconnectPeriod: 2500,
};

export const initialState: MqttStateProps = {
  client: mqtt.connect(brokerUrl, options),
  prefix,
  defaultPayload,
  channel,
};
