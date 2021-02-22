import { AnyAction } from "redux";
import {
  CHANGE_CHANNEL,
  ON_MESSAGE,
  PUBLISH,
  SUBSCRIBE,
  UNSUBSCRIBE,
} from "../actions/MqttActions";
import { initialState } from "../init/MqttState";

const MqttReducer = (
  state: MqttStateProps = initialState,
  action: AnyAction
) => {
  const { client, prefix, channel, defaultPayload } = state;
  const broadcastUrl = `${prefix}/${channel}/`;

  switch (action.type) {
    case PUBLISH:
      client.publish(broadcastUrl + action.payload.topic, defaultPayload);
      return state;

    case SUBSCRIBE:
      client.subscribe(broadcastUrl + action.payload.topic + "/#");
      return state;

    case UNSUBSCRIBE:
      client.unsubscribe(broadcastUrl + action.payload.topic + "/#");
      return state;

    case ON_MESSAGE:
      client.on("message", (received_topic: string, message: string) => {
        if (received_topic.includes(broadcastUrl + action.payload.topic)) {
          // TODO: Add password check with message
          action.payload.callback(received_topic, message);
        }
      });
      return state;
    case CHANGE_CHANNEL:
      return { ...state, channel: action.payload.channel };
    default:
      return state;
  }
};

export default MqttReducer;
