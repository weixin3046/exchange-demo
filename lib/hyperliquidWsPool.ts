import { EventEmitter } from 'events';

export type HLSubscriptionType = 'allMids' | 'l2Book' | 'userFills' | 'userFundings' | 'userTwaps';

export interface HLMarketData {
  mids: Record<string, string>;
  time: number;
}

export interface HLL2Book {
  coin: string;
  bids: Array<[string, string]>;
  asks: Array<[string, string]>;
  time: number;
}

export type HLSubscriptionCallback = (data: Record<string, unknown>) => void;

class HLWebSocketPool extends EventEmitter {
  private static instance: HLWebSocketPool;
  private ws: WebSocket | null = null;
  private wsUrl: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private subscriptions: Map<string, HLSubscriptionCallback[]> = new Map();
  private isManualClose = false;
  private messageQueue: string[] = [];
  private isConnected = false;

  private constructor() {
    super();
    this.wsUrl = process.env.NEXT_PUBLIC_HL_TESTNET_WS || 'wss://api-testnet.hyperliquid.xyz/ws';
  }

  public static getInstance(): HLWebSocketPool {
    if (!HLWebSocketPool.instance) {
      HLWebSocketPool.instance = new HLWebSocketPool();
    }
    return HLWebSocketPool.instance;
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected && this.ws) {
        resolve();
        return;
      }

      try {
        this.ws = new WebSocket(this.wsUrl);

        this.ws.onopen = () => {
          console.log('[HLWebSocketPool] Connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.reconnectDelay = 1000;
          this.emit('connected');

          // Flush queued messages
          while (this.messageQueue.length > 0) {
            const msg = this.messageQueue.shift();
            if (msg) this.ws?.send(msg);
          }

          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.channel === 'allMids') {
              this.emit('allMids', data.data);
              this.triggerCallbacks('allMids', data.data);
            } else if (data.channel === 'l2Book') {
              this.emit('l2Book', data.data);
              this.triggerCallbacks('l2Book', data.data);
            } else if (data.channel === 'userFills') {
              this.emit('userFills', data.data);
              this.triggerCallbacks('userFills', data.data);
            } else if (data.channel === 'userFundings') {
              this.emit('userFundings', data.data);
              this.triggerCallbacks('userFundings', data.data);
            } else if (data.channel === 'userTwaps') {
              this.emit('userTwaps', data.data);
              this.triggerCallbacks('userTwaps', data.data);
            }
          } catch (error) {
            console.error('[HLWebSocketPool] Message parsing error:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[HLWebSocketPool] WebSocket error:', error);
          this.emit('error', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[HLWebSocketPool] Connection closed');
          this.isConnected = false;

          if (!this.isManualClose && this.reconnectAttempts < this.maxReconnectAttempts) {
            const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), 30000);
            console.log(`[HLWebSocketPool] Reconnecting in ${delay}ms...`);
            this.reconnectAttempts++;
            setTimeout(() => this.connect().catch(console.error), delay);
          }
        };
      } catch (error) {
        console.error('[HLWebSocketPool] Connection error:', error);
        reject(error);
      }
    });
  }

  public subscribe(type: HLSubscriptionType, coin?: string, callback?: HLSubscriptionCallback): void {
    if (!this.isConnected || !this.ws) {
      console.warn('[HLWebSocketPool] Not connected, queuing subscription');
      return;
    }

    const subscriptionKey = coin ? `${type}:${coin}` : type;

    if (callback) {
      if (!this.subscriptions.has(subscriptionKey)) {
        this.subscriptions.set(subscriptionKey, []);
      }
      this.subscriptions.get(subscriptionKey)?.push(callback);
    }

    const message = {
      method: 'subscribe',
      subscription: {
        type,
        ...(coin && { coin }),
      },
    };

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('[HLWebSocketPool] Send error:', error);
      this.messageQueue.push(JSON.stringify(message));
    }
  }

  public unsubscribe(type: HLSubscriptionType, coin?: string): void {
    if (!this.isConnected || !this.ws) return;

    const subscriptionKey = coin ? `${type}:${coin}` : type;
    this.subscriptions.delete(subscriptionKey);

    const message = {
      method: 'unsubscribe',
      subscription: {
        type,
        ...(coin && { coin }),
      },
    };

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('[HLWebSocketPool] Unsubscribe error:', error);
    }
  }

  private triggerCallbacks(type: HLSubscriptionType, data: Record<string, unknown>): void {
    const callbacks = this.subscriptions.get(type);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (error) {
          console.error('[HLWebSocketPool] Callback error:', error);
        }
      });
    }
  }

  public isReady(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }

  public disconnect(): void {
    this.isManualClose = true;
    this.subscriptions.clear();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}

export default HLWebSocketPool.getInstance();
