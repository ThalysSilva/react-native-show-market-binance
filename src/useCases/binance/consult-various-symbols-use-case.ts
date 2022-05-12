import { useEffect, useState } from "react";
import { FileLog } from "../../adapters/file-log/file-log-interface";
import { miniTickerTransform } from "../../service/websocket/websocket";

export class ConsultVariousSymbolUseCase {
  constructor(
    private symbols: string[],
    private pathURL: string,
    private fileLog: FileLog | null,
    private enableLog: boolean | undefined,
    private createWebSocket: (
      symbol: string | null,
      pathURL: string
    ) => WebSocket
  ) {
    this.pathURL = pathURL;
    this.symbols = symbols;
  }

  execute() {
    const mountParamsSubscribe = [] as string[];

    this.symbols.forEach((symbol) => {
      mountParamsSubscribe.push(`${symbol}@${this.pathURL}`);
    });
    const [serverMessages, setServerMessages] = useState<string[]>([]);
    const ws = this.createWebSocket(null, this.pathURL);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [...mountParamsSubscribe],
          id: 1,
        })
      );
    };

    ws.addEventListener("ping", () => {
      ws.send("pong");
    });

    useEffect(() => {
      const serverMessageList = [] as string[];

      ws.onmessage = (message) => {
        const MessageObject = miniTickerTransform(message.data);
        const { lastPrice, volume, volumeQuote, symbol } = MessageObject;
        const totalVolume: number = parseInt(volume) + parseInt(volumeQuote);
        const marketCap: number = totalVolume * parseInt(lastPrice);
        const mountedMessage = `Symbol: ${symbol}, Current Price: ${lastPrice}, 24h Vol: ${totalVolume}, 24h Market Cap: ${marketCap}`;
        this.enableLog && symbol && this.fileLog?.createLog(mountedMessage);
        symbol && serverMessageList.push(mountedMessage);
        setServerMessages([...serverMessageList]);
      };
    }, []);

    return serverMessages;
  }
}
