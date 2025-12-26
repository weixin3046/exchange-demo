import { useCallback, useEffect, useRef, useState } from "react";
import WebSocketManager from "./websocket-manager";

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
}

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const { url, autoConnect = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsManagerRef = useRef<WebSocketManager | null>(null);

  // 初始化WebSocket管理器
  useEffect(() => {
    if (!wsManagerRef.current) {
      wsManagerRef.current = new WebSocketManager({
        url: url || "wss://your-websocket-url.com/ws",
      });
    }

    return () => {
      if (wsManagerRef.current) {
        wsManagerRef.current.disconnect();
        wsManagerRef.current = null;
      }
    };
  }, [url]);

  // 连接WebSocket
  const connect = useCallback(async () => {
    if (wsManagerRef.current) {
      try {
        await wsManagerRef.current.connect();
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect:", error);
        setIsConnected(false);
      }
    }
  }, []);

  // 断开连接
  const disconnect = useCallback(() => {
    if (wsManagerRef.current) {
      wsManagerRef.current.disconnect();
      setIsConnected(false);
    }
  }, []);

  // 自动连接
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      if (autoConnect) {
        disconnect();
      }
    };
  }, [autoConnect, connect, disconnect]);

  // 订阅函数
  const subscribe = useCallback((channel: string, params: Record<string, any> = {}, callback: (data: any) => void) => {
    if (wsManagerRef.current) {
      wsManagerRef.current.subscribe(channel, params, (data) => {
        setLastMessage(data);
        callback(data);
      });
    }
  }, []);

  // 取消订阅
  const unsubscribe = useCallback((channel: string) => {
    if (wsManagerRef.current) {
      wsManagerRef.current.unsubscribe(channel);
    }
  }, []);

  // 取消所有订阅
  const unsubscribeAll = useCallback(() => {
    if (wsManagerRef.current) {
      wsManagerRef.current.unsubscribeAll();
    }
  }, []);

  // 切换时区
  const switchTimezone = useCallback((timezone: string = "UTC+08") => {
    if (wsManagerRef.current) {
      wsManagerRef.current.switchTimezone(timezone);
    }
  }, []);

  // 获取订阅的频道
  const getSubscribedChannels = useCallback((): string[] => {
    if (wsManagerRef.current) {
      return wsManagerRef.current.getSubscribedChannels();
    }
    return [];
  }, []);

  // 检查是否订阅了某个频道
  const isSubscribed = useCallback((channel: string): boolean => {
    if (wsManagerRef.current) {
      return wsManagerRef.current.isSubscribed(channel);
    }
    return false;
  }, []);

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    unsubscribeAll,
    switchTimezone,
    getSubscribedChannels,
    isSubscribed,
  };
}
