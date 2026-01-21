type ConnectionState = "disconnected" | "connecting" | "connected";

type Listener = (data: unknown) => void;

class WebSocketManager {
  private url: string;
  private connectionState: ConnectionState = "disconnected";
  private listeners: Map<string, Listener[]> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  connect() {
    this.connectionState = "connected";
  }

  disconnect() {
    this.connectionState = "disconnected";
  }

  sendMessage(data: unknown) {
    console.log("WebSocket sendMessage:", data);
  }

  subscribe(eventType: string, listener: (data: unknown) => void): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(listener);
  }

  unsubscribe(eventType: string, listener: (data: unknown) => void): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}

let managerInstance: WebSocketManager | null = null;

export function getWebSocketManager(url: string): WebSocketManager {
  if (!managerInstance) {
    managerInstance = new WebSocketManager(url);
  }
  return managerInstance;
}
