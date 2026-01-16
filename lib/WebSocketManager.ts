import { KlineData } from "@/datafeed";
import { inflate } from "pako";

interface SubscriptionParams {
  channel: string;
  cb_id?: string;
  endIdx?: number;
  pageSize?: number;
  top?: number;
  priceChangeType?: string;
  klineZone?: string;
}
interface SubscriptionMessage {
  event: "sub" | "unsub" | "req";
  params: SubscriptionParams;
}

// interface ServerResponse<T> {
//   event_rep: string;
//   channel: string;
//   ping?: string;
//   data?: T;
//   tick?: T;
// }

export class SocketManager {
  private socket: WebSocket | null = null;
  private readonly url: string;
  private historyListeners: Map<string, (data: KlineData[]) => void> = new Map();
  private realtimeListeners: Map<string, (data: KlineData) => void> = new Map();
  private pendingMessages: SubscriptionMessage[] = [];
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
      // 🔥 连接成功后，发送所有待发送消息
      this.pendingMessages.forEach((msg) => {
        console.log("补发消息:", msg);
        this.socket?.send(JSON.stringify(msg));
      });

      // 清空队列
      this.pendingMessages = [];
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
      console.log("Socket 未连接，消息进入队列:", message);
      this.pendingMessages.push(message);
    }
  }

  private handleMessage(jsonData: string): void {
    try {
      const response = JSON.parse(jsonData);
      const channel = response.channel;
      if (response.ping) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(
            JSON.stringify({
              pong: 1,
            })
          );
        }
        return;
      }
      if (response.event_rep === "rep") {
        const listener = this.historyListeners.get(channel);
        if (listener) {
          listener(response.data);
        }
      } else {
        const listener = this.realtimeListeners.get(channel);
        if (listener) {
          listener(response.tick);
        }
      }
    } catch (error) {
      console.error("解析 WebSocket 消息失败:", error);
    }
  }

  // --- 对外暴露的方法 ---

  public subscribeToHistory(channel: string, params: SubscriptionParams, listener: (data: KlineData[]) => void): void {
    this.historyListeners.set(channel, listener);
    this.send({
      event: "req",
      params,
    });
  }

  public subscribeToRealtime(channel: string, cbId: string, listener: (data: KlineData) => void): void {
    this.realtimeListeners.set(channel, listener);
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
    this.historyListeners.delete(channel);
  }

  public close(): void {
    this.socket?.close();
  }
}

const SOCKET_URL = "wss://ws.coobit.cc/kline-api/ws";
const socketManagerInstance = new SocketManager(SOCKET_URL);
export default socketManagerInstance;
