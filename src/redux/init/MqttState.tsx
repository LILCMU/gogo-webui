import mqtt, { IClientOptions } from "mqtt";

const brokerUrl: string = "wss://remotelab-broker.gogoboard.org:8443/mqtt"
const prefix: string = "GoGoBoard/BroadcastT";
const defaultPayload: string = "gogoBroadcastMQTT!@LILCMU";

const options: IClientOptions = {
  reconnectPeriod: 2500,
};

const getChannel = (): string => {
  return new URLSearchParams(window.location.search).get("channel") ?? "0";
}

export const initialState: MqttStateProps = {
  client: mqtt.connect(brokerUrl, options),
  prefix,
  defaultPayload,
  channel: getChannel(),
};
