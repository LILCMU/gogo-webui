import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  subscribe,
  unsubscribe,
  on_message,
} from "src/redux/actions/MqttActions";

import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

const Status: FC<
  StatusProps & { subscribe: any; on_message: any; unsubscribe: any }
> = ({ text, ...props }) => {
  const { subscribe, unsubscribe, on_message } = props;
  const [message, setMessage] = useState<string>("off");

  useEffect(() => {
    subscribe(text);
    on_message(text, (message: string) => setMessage(message.toString()));
    return () => {
      unsubscribe(text);
    };
  });
  return (
    <EmojiObjectsIcon
      // fontSize="large"
      style={{
        color: message === "on" ? "orange" : "darkgrey",
        fontSize: "18vh",
      }}
    />
  );
};

const mapDispatchToProps = { subscribe, on_message, unsubscribe };

export default connect(null, mapDispatchToProps)(Status);
