const socket = new WebSocket("wss://ws.coobit.cc/kline-api/ws ");

socket.addEventListener("open", () => {
  console.log("[socket] Connected");
});

socket.addEventListener("close", (reason) => {
  console.log("[socket] Disconnected:", reason);
});

socket.addEventListener("error", (error) => {
  console.log("[socket] Error:", error);
});

export function subscribeOnStream(symbolInfo: string) {
  console.log(symbolInfo);
  // if (!symbolInfo || !symbolInfo.ticker) {
  //   console.error("[subscribeBars]: Invalid symbolInfo:", symbolInfo);
  //   return;
  // }
}

export function unsubscribeFromStream(subscriberUID: string) {
  console.log(subscriberUID);
}
