import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  on_message,
  SubscribeType,
  OnMessageType,
  UnsubscribeType,
} from "src/redux/actions/MqttActions";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

interface StatusWidgetProps {
  widget: StatusProps;
  disable: boolean;
  gridSize: GridSize;
  subscribe: SubscribeType;
  on_message: OnMessageType;
  unsubscribe: UnsubscribeType;
}

const Status: FC<StatusWidgetProps> = ({
  widget,
  disable,
  gridSize,
  subscribe,
  on_message,
  unsubscribe,
}) => {
  const [message, setMessage] = useState<string>("off");

  const { text, size, color } = widget;

  useEffect(() => {
    if (!disable) {
      subscribe(text);
      on_message(text, (received_topic: string, _: string) => {
        const message_after_topic = received_topic.split(`${text}/`);
        setMessage(message_after_topic[1]);
      });
    }
    return () => {
      if (!disable) {
        unsubscribe(text);
      }
    };
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
      }}
    >
      <EmojiObjectsIcon
        style={{
          color: message === "on" ? color : "darkgrey",
          fontSize: `${Math.min(
            size.width * gridSize.width,
            size.height * gridSize.height
          )}px`,
        }}
      />
    </div>
  );
};

const mapDispatchToProps = { subscribe, on_message, unsubscribe };

export default connect(null, mapDispatchToProps)(Status);
