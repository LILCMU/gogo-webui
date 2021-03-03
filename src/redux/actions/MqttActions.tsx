export const PUBLISH = "PUBLISH";
export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const ON_MESSAGE = "ON_MESSAGE";
export const CHANGE_CHANNEL = "CHANGE_CHANNEL";

export type publish_type = (
  topic: string,
  message?: string
) => { type: string; payload: { topic: string } };

export const publish: publish_type = (topic, message) => ({
  type: PUBLISH,
  payload: { topic, message },
});

export type subscribe_type = (
  topic: string
) => { type: string; payload: { topic: string } };

export const subscribe: subscribe_type = (topic) => ({
  type: SUBSCRIBE,
  payload: { topic },
});

export type unsubscribe_type = (
  topic: string
) => { type: string; payload: { topic: string } };

export const unsubscribe: unsubscribe_type = (topic) => ({
  type: UNSUBSCRIBE,
  payload: { topic },
});

export type on_message_type = (
  topic: string,
  callback: (selected_topic: string, message: string) => any
) => {
  type: string;
  payload: {
    topic: string;
    callback: (selected_topic: string, message: string) => any;
  };
};

export const on_message: on_message_type = (topic, callback) => ({
  type: ON_MESSAGE,
  payload: { topic, callback },
});

export type change_channel_type = (
  channel: string
) => { type: string; payload: { channel: string } };

export const change_channel: change_channel_type = (channel) => ({
  type: CHANGE_CHANNEL,
  payload: { channel },
});
