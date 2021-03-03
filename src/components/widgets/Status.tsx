import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  on_message,
  subscribe_type,
  on_message_type,
  unsubscribe_type,
} from "src/redux/actions/MqttActions";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

interface StatusWidgetProps extends StatusProps {
  subscribe: subscribe_type;
  on_message: on_message_type;
  unsubscribe: unsubscribe_type;
}

const Status: FC<StatusWidgetProps & { gridSize: GridSize }> = ({
  text,
  gridSize,
  ...props
}) => {
  const { subscribe, unsubscribe, on_message, disable } = props;
  const [message, setMessage] = useState<string>("off");

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
    <div>
      <EmojiObjectsIcon
        style={{
          color: message === "on" ? "orange" : "darkgrey",
          fontSize: "128px",
        }}
      />
    </div>
  );
};

const mapDispatchToProps = { subscribe, on_message, unsubscribe };

export default connect(null, mapDispatchToProps)(Status);
