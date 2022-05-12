export function createWebSocket(symbol: string | null, pathUrl: string) {
  const BASE = "wss://stream.binance.com:9443/ws";
  return new WebSocket(BASE + "/" + (!!symbol ? symbol : "") + pathUrl);
}

export const miniTickerTransform = (string: string) => {
  const m = JSON.parse(string);
  return {
    eventType: m.e,
    eventTime: m.E,
    symbol: m.s,
    lastPrice: m.c,
    open: m.o,
    high: m.h,
    low: m.l,
    volume: m.v,
    volumeQuote: m.q,
  };
};
