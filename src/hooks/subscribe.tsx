import { useContext, useEffect, useState } from "react";
import { MqttContext } from "./mqtt";

// const subscribe = (topic: string) => {
//   const { client } = useContext(MqttContext) as AppContext;
//   const [message, setMessage] = useState("off");

//   useEffect(() => {
//     client.subscribe(topic);
//     client.on("message", (_topic: string, message: string) => {
//       if (_topic === topic) {
//         setMessage(message.toString());
//       }
//     });
//     return () => {
//       client.unsubscribe(topic);
//     };
//   });

//   return { message };
// };
