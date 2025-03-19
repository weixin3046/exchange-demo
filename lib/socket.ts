import { ConnectionState } from "@/types/socket";

class WebSocketManager {
  private websocket: WebSocket | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private eventListeners: Map<string, Set<(data: any) => void>> = new Map();
  private retryCount = 0; // 当前重试次数
  private maxRetries = 3; // 最大重试次数
  private reconnectTimeout = 3000; // 重连间隔（毫秒）
  private connectionState: ConnectionState = "disconnected";

  constructor(private url: string) {}

  public connect() {
    if (this.websocket) return;
    this.updateConnectionState("connecting");
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      this.retryCount = 0; // 重置重试计数
      this.updateConnectionState("connected");
      this.dispatchEvent("open");
    };
    this.websocket.onclose = () => {
      this.updateConnectionState("disconnected");
      this.dispatchEvent("close");
      this.websocket = null;
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.warn(`WebSocket closed. Attempting to reconnect... (${this.retryCount}/${this.maxRetries})`);
        setTimeout(() => this.connect(), this.reconnectTimeout);
      } else {
        console.error("Max retries reached. Unable to reconnect.");
        this.dispatchEvent("error", { message: "Max retries reached" });
      }
    };
    this.websocket.onerror = (event) => {
      this.updateConnectionState("disconnected");
      this.dispatchEvent("error", event);
    };
    this.websocket.onmessage = (event) => this.handleMessage(event);
  }

  public disconnect() {
    if (this.websocket) {
      this.websocket.close(1000, "Manual disconnect");
      this.websocket = null;
    }
    this.retryCount = 0;
    this.updateConnectionState("disconnected");
  }
  public getConnectionState() {
    return this.connectionState;
  }

  private updateConnectionState(state: ConnectionState) {
    this.connectionState = state;
    this.dispatchEvent("stateChange", state);
  }
  public sendMessage<T>(message: T) {
    console.log("==========================");
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected. Message not sent:", message);
    }
  }

  public subscribe<T>(eventType: string, listener: (data: T) => void) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)!.add(listener);
  }

  public unsubscribe<T>(eventType: string, listener: (data: T) => void) {
    this.eventListeners.get(eventType)?.delete(listener);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const message = JSON.parse(event?.data); // 假设 WebSocket 消息是 JSON 格式
      if (message?.ping) {
        this.sendMessage({ pong: 1 });
        return;
      }
      const { type } = message;

      if (type && this.eventListeners.has(type)) {
        this.dispatchEvent(type, message);
      }
    } catch (error) {
      console.log(error);
      console.error("Failed to parse WebSocket message:", event.data);
    }
  }

  private dispatchEvent(eventType: string, data?: unknown) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}

let instance: WebSocketManager | null = null;

export const getWebSocketManager = (url: string) => {
  if (!instance) {
    instance = new WebSocketManager(url);
  }
  return instance;
};
