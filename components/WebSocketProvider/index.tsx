"use client";
import { getWebSocketManager } from "@/lib/socket";
import { ConnectionState } from "@/types/socket";
import React, { createContext, useEffect, useState } from "react";

type WebSocketContextType = {
  sendMessage: (data: unknown) => void;
  subscribe: (eventType: string, listener: (data: unknown) => void) => void;
  unsubscribe: (eventType: string, listener: (data: unknown) => void) => void;
  connectionState: "disconnected" | "connecting" | "connected";
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ url, children }: { url: string; children: React.ReactNode }) => {
  const webSocketManager = getWebSocketManager(url);

  const [connectionState, setConnectionState] = useState<ConnectionState>(webSocketManager.getConnectionState());

  useEffect(() => {
    console.log(connectionState);
    if (connectionState === "connected") {
      console.log("可以发送消息了");
      webSocketManager.sendMessage({
        op: "subscribe",
        args: [
          {
            ccy: "BTC",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "ETH",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "OKB",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "SOL",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "TON",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "DOGE",
            channel: "cup-tickers-3s",
          },
          {
            ccy: "XRP",
            channel: "cup-tickers-3s",
          },
        ],
      });
    }
  }, [connectionState, webSocketManager]);

  useEffect(() => {
    const handleStateChange = (state: ConnectionState) => {
      setConnectionState(state);
    };
    webSocketManager.subscribe("stateChange", handleStateChange);
    webSocketManager.connect();

    return () => {
      webSocketManager.unsubscribe("stateChange", handleStateChange);
      webSocketManager.disconnect();
    };
  }, [webSocketManager]);

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage: webSocketManager.sendMessage.bind(webSocketManager),
        subscribe: webSocketManager.subscribe.bind(webSocketManager),
        unsubscribe: webSocketManager.unsubscribe.bind(webSocketManager),
        connectionState,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
