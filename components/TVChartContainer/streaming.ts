import { SUPPORTED_RESOLUTIONS } from "@/constants";
import { wsService } from "@/lib/socket";
import { LibrarySymbolInfo, ResolutionString, SubscribeBarsCallback } from "@/public/charting_library/charting_library";

export const channelToSubscription = new Map();

export function subscribeOnStream(
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  onRealtimeCallback: SubscribeBarsCallback,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastBar: any
) {
  if (!symbolInfo || !symbolInfo.ticker) {
    console.error("[subscribeBars]: Invalid symbolInfo:", symbolInfo);
    return;
  }
  let interval = null;
  SUPPORTED_RESOLUTIONS.map((item) => {
    if (item.value === resolution) {
      interval = item.label;
    }
  });
  const channelString = `market_${symbolInfo.ticker}_kline_${interval}`;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  };
  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    subscriptionItem.resolution = resolution;
    subscriptionItem.lastBar = lastBar;
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastBar,
    cb_id: symbolInfo.ticker,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  const subRequest = {
    event: "req",
    params: {
      channel: channelString,
      cb_id: symbolInfo.ticker,
    },
  };
  if (wsService.readyState === WebSocket.OPEN) {
    wsService.send(JSON.stringify(subRequest));
  }
}

export function unsubscribeFromStream(subscriberUID: string) {
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex((handler: { id: string }) => handler.id === subscriberUID);

    if (handlerIndex !== -1) {
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        console.log("[unsubscribeBars]: Unsubscribe from streaming. Channel:", channelString);
        const subRequest = {
          action: "unsub",
          params: {
            channel: channelString,
            cb_id: subscriptionItem.cb_id,
          },
        };
        console.log(subRequest);
        wsService.send(JSON.stringify(subRequest));
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
