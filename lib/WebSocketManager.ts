// 定义：发送给服务器的消息接口
import { inflate } from "pako";

interface SubscriptionMessage {
  event: "sub" | "unsub" | "req";
  params: {
    channel: string;
    cb_id: string;
  };
}

interface ServerResponse<T> {
  event_rep?: string;
  channel?: string;
  data?: T;
  tick?: T;
  // ... 其他可能的字段
}

export class SocketManager {
  private socket: WebSocket | null = null;
  private readonly url: string;
  private historyListeners: Map<string, Set<(data: any) => void>> = new Map();
  private realtimeListeners: Map<string, Set<(data: any) => void>> = new Map();

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  public connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("Socket 已经连接。");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket 已连接。");
    };

    this.socket.onmessage = async (event) => {
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
    };

    this.socket.onclose = () => {
      console.log("WebSocket 已断开连接。");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket 错误:", error);
    };
  }

  private send(message: SubscriptionMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("发送消息:", message);
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket 未连接，无法发送消息。");
    }
  }

  private handleMessage(jsonData: string): void {
    try {
      const response: ServerResponse<any> = JSON.parse(jsonData);
      if (response.event_rep === "rep") {
        // TODO: 这里没有返回cb_id
      }
      const channelId = response.ch || response.rep;

      if (channelId) {
        if (response.rep && this.historyListeners.has(channelId)) {
          this.historyListeners.get(channelId)?.forEach((listener) => listener(response.data));
        } else if (response.ch && this.realtimeListeners.has(channelId)) {
          this.realtimeListeners.get(channelId)?.forEach((listener) => listener(response.data));
        }
      }
    } catch (error) {
      console.error("解析 WebSocket 消息失败:", error);
    }
  }

  // --- 对外暴露的方法 ---

  public subscribeToHistory(channel: string, cbId: string, listener: (data: any) => void): void {
    if (!this.historyListeners.has(channel)) this.historyListeners.set(channel, new Set());
    this.historyListeners.get(channel)?.add(listener);

    this.send({
      event: "req",
      params: { channel, cb_id: cbId },
    });
  }

  public subscribeToRealtime(channel: string, cbId: string, listener: (data: any) => void): void {
    if (!this.realtimeListeners.has(channel)) this.realtimeListeners.set(channel, new Set());
    this.realtimeListeners.get(channel)?.add(listener);

    this.send({
      event: "sub",
      params: { channel, cb_id: cbId },
    });
  }

  // 新增：通知服务器取消订阅
  public unsubscribe(channel: string, cbId: string): void {
    this.send({
      event: "unsub", // 使用 'unsub' 事件
      params: { channel, cb_id: cbId },
    });
    // 可选：清除本地监听器，或交由 TVDataFeed 管理
    this.realtimeListeners.delete(channel);
  }

  public close(): void {
    this.socket?.close();
  }
}

// const SocketManagerClient = new SocketManager("wss://ws.coobit.cc/kline-api/ws");
const SOCKET_URL = "wss://ws.coobit.cc/kline-api/ws";
const socketManagerInstance = new SocketManager(SOCKET_URL);
export default socketManagerInstance;
