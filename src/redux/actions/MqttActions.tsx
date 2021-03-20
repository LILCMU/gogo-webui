export const PUBLISH = "PUBLISH";
export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const ON_MESSAGE = "ON_MESSAGE";
export const CHANGE_CHANNEL = "CHANGE_CHANNEL";

export type PublishType = (
  topic: string,
  message?: string
) => { type: string; payload: { topic: string } };

export const publish: PublishType = (topic, message) => ({
  type: PUBLISH,
  payload: { topic, message },
});

export type SubscribeType = (
  topic: string
) => { type: string; payload: { topic: string } };

export const subscribe: SubscribeType = (topic) => ({
  type: SUBSCRIBE,
  payload: { topic },
});

export type UnsubscribeType = (
  topic: string
) => { type: string; payload: { topic: string } };

export const unsubscribe: UnsubscribeType = (topic) => ({
  type: UNSUBSCRIBE,
  payload: { topic },
});

export type OnMessageType = (
  topic: string,
  callback: (selected_topic: string, message: string) => any
) => {
  type: string;
  payload: {
    topic: string;
    callback: (selected_topic: string, message: string) => any;
  };
};

export const on_message: OnMessageType = (topic, callback) => ({
  type: ON_MESSAGE,
  payload: { topic, callback },
});

export type ChangeChannelType = (
  channel: string
) => { type: string; payload: { channel: string } };

export const change_channel: ChangeChannelType = (channel) => ({
  type: CHANGE_CHANNEL,
  payload: { channel },
});
