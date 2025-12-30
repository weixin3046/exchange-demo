import { inflate } from "pako";

interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

interface WebSocketMessage {
  channel: string;
  data?: any;
  raw?: any;
  timestamp?: number;
}

interface Subscription {
  channel: string;
  params?: Record<string, string>;
  callback: (data: WebSocketMessage) => void;
}

class WebSocketManager {
  private ws: WebSocket | null = null;
  private subscriptions: Map<string, Subscription> = new Map();
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private isConnected = false;

  constructor(private config: WebSocketConfig) {
    this.config = {
      //   url: 'wss://your-websocket-url.com/ws', // 替换为实际的WebSocket地址
      reconnectInterval: 3000,
      maxReconnectAttempts: 5,
      heartbeatInterval: 30000,
      ...config,
    };
  }

  // 连接WebSocket
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.url);

        this.ws.onopen = () => {
          console.log("WebSocket connected");
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.resubscribeAll();
          resolve();
        };

        this.ws.onmessage = async (event) => {
          if (event.data instanceof Blob) {
            // 1. Blob -> ArrayBuffer
            const buffer = await event.data.arrayBuffer();
            // 2. ArrayBuffer -> Uint8Array
            const uint8 = new Uint8Array(buffer);
            // 3. 尝试 gzip 解压
            const data = inflate(uint8, { to: "string" });
            this.handleMessage(data);
          } else {
            this.handleMessage(event.data);
          }
          //   this.handleMessage(event.data);
        };

        this.ws.onclose = (event) => {
          console.log("WebSocket disconnected", event);
          this.isConnected = false;
          this.stopHeartbeat();
          this.handleReconnection();
        };

        this.ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // 断开连接
  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.isConnected = false;
  }

  // 订阅频道
  subscribe(channel: string, params: Record<string, string> = {}, callback: (data: WebSocketMessage) => void): void {
    // 存储订阅信息，使用channel作为key
    this.subscriptions.set(channel, {
      channel,
      params,
      callback,
    });

    // 如果已连接，立即发送订阅请求
    if (this.isConnected && this.ws) {
      this.sendSubscription(channel, params);
    }
  }

  // 取消订阅
  unsubscribe(channel: string): void {
    if (this.subscriptions.has(channel)) {
      this.subscriptions.delete(channel);

      // 发送取消订阅请求
      if (this.isConnected && this.ws) {
        const unsubscribeMsg = {
          event: "unsub",
          params: { channel },
        };
        this.ws.send(JSON.stringify(unsubscribeMsg));
      }
    }
  }

  // 取消所有订阅
  unsubscribeAll(): void {
    this.subscriptions.forEach((_, channel) => {
      this.unsubscribe(channel);
    });
  }

  // 切换时区
  switchTimezone(timezone: string = "UTC+08"): void {
    if (this.isConnected && this.ws) {
      const timezoneMsg = {
        event: "req",
        params: {
          channel: "timezone",
          priceChangeType: "klineZone",
          klineZone: timezone,
        },
      };
      this.ws.send(JSON.stringify(timezoneMsg));
    }
  }

  // 发送订阅消息
  private sendSubscription(channel: string, params: Record<string, string>): void {
    const subscriptionMsg = {
      event: "sub",
      params: {
        channel,
        ...params,
      },
    };

    this.ws?.send(JSON.stringify(subscriptionMsg));
  }

  // 处理接收到的消息
  private handleMessage(data: string): void {
    try {
      const parsedData = JSON.parse(data);
      const { channel, tick, data: tickData } = parsedData;

      if (!channel) return;

      // 根据channel查找对应的订阅
      const subscription = this.subscriptions.get(channel);

      if (subscription) {
        // 调用对应的回调函数
        subscription.callback({
          channel,
          data: tickData || tick,
          raw: parsedData,
          timestamp: parsedData.ts || Date.now(),
        });
      } else {
        // 如果没有找到订阅，但是有channel，记录日志
        if (channel) {
          console.warn(`Received data for unsubscribed channel: ${channel}`);
        }
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error, data);
    }
  }

  // 断线重连
  private handleReconnection(): void {
    if (this.reconnectAttempts < (this.config.maxReconnectAttempts || 5)) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})...`);

      this.reconnectTimer = setTimeout(() => {
        this.connect().catch(console.error);
      }, this.config.reconnectInterval);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  // 心跳检测
  private startHeartbeat(): void {
    if (this.config.heartbeatInterval) {
      this.heartbeatTimer = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          // 发送心跳消息（根据实际API要求）
          const heartbeatMsg = { event: "ping" };
          this.ws.send(JSON.stringify(heartbeatMsg));
        }
      }, this.config.heartbeatInterval);
    }
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  // 重新订阅所有频道
  private resubscribeAll(): void {
    this.subscriptions.forEach((subscription) => {
      this.sendSubscription(subscription.channel, subscription.params || {});
    });
  }

  // 获取连接状态
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // 获取所有订阅的频道
  getSubscribedChannels(): string[] {
    return Array.from(this.subscriptions.keys());
  }

  // 检查是否订阅了某个频道
  isSubscribed(channel: string): boolean {
    return this.subscriptions.has(channel);
  }
}

export default WebSocketManager;
