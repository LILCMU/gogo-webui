export const PUBLISH = "PUBLISH";
export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const ON_MESSAGE = "ON_MESSAGE";
export const CHANGE_CHANNEL = "CHANGE_CHANNEL";

export const publish = (topic: string, message?: string) => ({
  type: PUBLISH,
  payload: { topic, message },
});

export const subscribe = (topic: string) => ({
  type: SUBSCRIBE,
  payload: { topic },
});

export const unsubscribe = (topic: string) => ({
  type: UNSUBSCRIBE,
  payload: { topic },
});

export const on_message = (
  topic: string,
  callback: (selected_topic: string, message: string) => any
) => ({
  type: ON_MESSAGE,
  payload: { topic, callback },
});

export const change_channel = (channel: string) => ({
  type: CHANGE_CHANNEL,
  payload: { channel },
});
