import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  subscribe,
  SubscribeType,
  on_message,
  OnMessageType,
  unsubscribe,
  UnsubscribeType,
} from "src/redux/actions/MqttActions";

import { useTheme, Button } from "@material-ui/core";

interface DisplayWidgetProps {
  widget: DisplayProps;
  disable: boolean;
  gridSize: GridSize;
  subscribe: SubscribeType;
  on_message: OnMessageType;
  unsubscribe: UnsubscribeType;
}

const Display: FC<DisplayWidgetProps> = ({
  widget,
  disable,
  gridSize,
  subscribe,
  on_message,
  unsubscribe,
}) => {
  const { text, color = "", size } = widget;
  const [message, setMessage] = useState("Message");

  const theme = useTheme();

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
    <Button
      variant="outlined"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ddd",
        textTransform: "none",
        fontWeight: "normal",
        fontSize: `${size.height * gridSize.height * 0.2}px`,
        borderRadius: `${theme.spacing(1)}px`,
        border: `5px solid ${color}`,
        whiteSpace: "normal",
        wordWrap: "break-word",
        color: color,
      }}
      onClick={() => subscribe(text)}
      disabled
    >
      {message}
    </Button>
  );
};

const mapDispatchToProps = {
  subscribe,
  on_message,
  unsubscribe,
};

export default connect(null, mapDispatchToProps)(Display);
