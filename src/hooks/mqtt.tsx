import { createContext, FC, useEffect, useState } from "react";
import mqtt, { IClientOptions } from "mqtt";

const brokerUrl: string = "ws://message-broker.gogoboard.org:8083/mqtt"; // for websocket client
const options: IClientOptions = {
  reconnectPeriod: 2000,
  protocol: "ws",
};
const path = "GoGoBoard/BroadcastT";
const defaultPayload = "gogoBroadcastMQTT!@LILCMU";

export const MqttContext = createContext<AppContext | null>(null);

export const MqttProvider: FC = ({ children }) => {
  const [client] = useState(mqtt.connect(brokerUrl, options));

  useEffect(() => {
    client.on("connect", () => console.log("Connected Success"));

    return () => {
      client.end();
    };
  });

  const publish: any = (topic: string, channel: number) =>
    client.publish(path + "/" + channel + "/" + topic, defaultPayload);

  const subscribe = (
    topic: string,
    fn: (topic: string, message: string) => any
  ) => {
    client.subscribe(topic);

    return client.on("message", (topic: string, message: string) => {
      fn(topic, message);
    });
  };

  return (
    <MqttContext.Provider value={{ client, publish, subscribe }}>
      {children}
    </MqttContext.Provider>
  );
};
