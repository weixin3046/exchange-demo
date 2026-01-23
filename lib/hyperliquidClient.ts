import axios, { AxiosInstance } from 'axios';

const isTestnet = process.env.NEXT_PUBLIC_HL_IS_TESTNET === 'true';
const apiBaseUrl = isTestnet
  ? process.env.NEXT_PUBLIC_HL_TESTNET_API
  : 'https://api.hyperliquid.xyz';

interface HLAllMidsResponse {
  [coin: string]: string;
}

interface HLL2BookResponse {
  coin: string;
  time: number;
  levels: [Array<[string, string]>, Array<[string, string]>];
}

interface HLUserStateResponse {
  crossMaintenanceMarginUsed: string;
  crossMarginAccountState: {
    liquidationPrice: string | null;
    totalNotionalUsd: string;
    totalRaw: string;
  };
  marginSummary: {
    accountValue: string;
    totalMarginUsed: string;
    totalNtlPos: string;
    totalRawUsd: string;
  };
  assetPositions: Array<{
    coin: string;
    cumFunding: {
      allTime: string;
      sinceChange: string;
      sinceOpen: string;
    };
    entryPrice: string | null;
    leverage: { cross: number; isolated: number | null };
    liquidationPrice: string | null;
    longWeightInitial: string;
    longWeightMaintenance: string;
    maxLeverage: number;
    openCost: string;
    percentAbsolute: string;
    positionValue: string;
    returnOnEquity: string;
    szi: string;
    unrealizedPnl: string;
  }>;
}

class HyperliquidClient {
  private axiosInstance: AxiosInstance;
  private isTestnet: boolean;

  constructor() {
    this.isTestnet = isTestnet;
    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 10000,
    });

    console.log(
      `[HyperliquidClient] Initialized with ${this.isTestnet ? 'TESTNET' : 'MAINNET'} (${apiBaseUrl})`
    );
  }

  async getAllMids(): Promise<HLAllMidsResponse> {
    try {
      const response = await this.axiosInstance.post('/info', {
        type: 'allMids',
      });
      return response.data;
    } catch (error) {
      console.error('[HyperliquidClient] getAllMids error:', error);
      throw error;
    }
  }

  async getL2Book(coin: string): Promise<HLL2BookResponse> {
    try {
      const response = await this.axiosInstance.post('/info', {
        type: 'l2Book',
        coin,
      });
      return response.data;
    } catch (error) {
      console.error('[HyperliquidClient] getL2Book error:', error);
      throw error;
    }
  }

  async getUserState(user: string): Promise<HLUserStateResponse> {
    try {
      const response = await this.axiosInstance.post('/info', {
        type: 'clearinghouseState',
        user,
      });
      return response.data;
    } catch (error) {
      console.error('[HyperliquidClient] getUserState error:', error);
      throw error;
    }
  }

  async getOpenOrders(user: string): Promise<Record<string, unknown>[]> {
    try {
      const response = await this.axiosInstance.post('/info', {
        type: 'openOrders',
        user,
      });
      return response.data;
    } catch (error) {
      console.error('[HyperliquidClient] getOpenOrders error:', error);
      throw error;
    }
  }

  async getMetaAndAssetCtxs(): Promise<Record<string, unknown>> {
    try {
      const response = await this.axiosInstance.post('/info', {
        type: 'metaAndAssetCtxs',
      });
      return response.data;
    } catch (error) {
      console.error('[HyperliquidClient] getMetaAndAssetCtxs error:', error);
      throw error;
    }
  }

  getIsTestnet(): boolean {
    return this.isTestnet;
  }

  getApiBaseUrl(): string {
    return apiBaseUrl || '';
  }
}

const client = new HyperliquidClient();
export default client;
