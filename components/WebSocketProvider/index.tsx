"use client";
// import { getWebSocketManager } from "@/lib/socket";
import React, { createContext, useContext } from "react";

type WebSocketContextType = {
  sendMessage: (data: unknown) => void;
  subscribe: (eventType: string, listener: (data: unknown) => void) => void;
  unsubscribe: (eventType: string, listener: (data: unknown) => void) => void;
  connectionState: "disconnected" | "connecting" | "connected";
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  // const webSocketManager = getWebSocketManager();

  // const [connectionState, setConnectionState] = useState<ConnectionState>(webSocketManager.getConnectionState());

  // useEffect(() => {
  //   const handleStateChange = (state: ConnectionState) => {
  //     setConnectionState(state);
  //   };
  //   // webSocketManager.subscribe("stateChange", handleStateChange);
  //   // webSocketManager.connect();

  //   return () => {
  //     webSocketManager.unsubscribe("stateChange", handleStateChange);
  //     webSocketManager.disconnect();
  //   };
  // }, [webSocketManager]);

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

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  }
  return context;
};
