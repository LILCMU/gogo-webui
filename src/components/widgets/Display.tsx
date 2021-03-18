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
  subscribe: SubscribeType;
  on_message: OnMessageType;
  unsubscribe: UnsubscribeType;
}

const Display: FC<DisplayWidgetProps> = ({
  widget,
  disable,
  subscribe,
  on_message,
  unsubscribe,
}) => {
  const { text, color = "" } = widget;
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
        backgroundColor: `${theme.palette.grey[400]}`,
        textTransform: "none",
        fontWeight: "normal",
        fontSize: "20px",
        borderRadius: `${theme.spacing(1)}px`,
        border: `5px solid ${color}`,
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
