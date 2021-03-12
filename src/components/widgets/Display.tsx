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
import { Modal } from "..";

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

  const Content = () => (
    <Button
      variant="outlined"
      style={{
        width: `${size.width * gridSize.width}px`,
        height: `${size.height * gridSize.height}px`,
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

  return (
    <>{disable ? <Modal widget={widget}>{Content()}</Modal> : Content()}</>
  );
};

const mapDispatchToProps = {
  subscribe,
  on_message,
  unsubscribe,
};

export default connect(null, mapDispatchToProps)(Display);
