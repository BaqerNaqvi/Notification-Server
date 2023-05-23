import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const RefreshBrowser = ({ source }) => {
  const [connection, setConnection] = useState(null);
  const [counter, setCounter] = useState(5);
  let token = useRef(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5049/hubs/refresh")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [source]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");
          connection.on("RefreshClient", (message) => {
            token.current = setInterval(() => {
              setCounter((counter) => counter - 1);
            }, 1000);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }

    return () => {
      if (token.current) {
        clearInterval(token.current);
      }
    };
  }, [connection]);

  useEffect(() => {
    if (counter === 0 && token.current) {
      clearInterval(token.current);
    }
  }, [counter]);

  return <div>{counter}</div>;
};

export default React.memo(RefreshBrowser);
