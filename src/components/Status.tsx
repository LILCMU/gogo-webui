import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { MqttClient } from "mqtt";
import { FC, useContext, useEffect, useState } from "react";
import { MqttContext } from "src/hooks/mqtt";

const Status: FC<StatusProps> = ({ text }) => {
  const { client } = useContext(MqttContext) as AppContext;
  const [message, setMessage] = useState<string>("off");

  useEffect(() => {
    client.subscribe(text);
    client.on("message", (topic: string, message: string) => {
      if (topic === text) {
        setMessage(message.toString());
        // console.log(message.toString());
      }
    });
    return () => {
      (client as MqttClient).unsubscribe(text);
    };
  });
  return (
    <EmojiObjectsIcon
      // fontSize="large"
      style={{
        color: message === "on" ? "orange" : "darkgrey",
        fontSize: "60px",
      }}
    />
  );
};

export default Status;
