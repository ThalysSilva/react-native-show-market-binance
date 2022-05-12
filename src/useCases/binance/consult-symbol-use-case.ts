import { useEffect, useState } from "react";
import { FileLog } from "../../adapters/file-log/file-log-interface";
import { miniTickerTransform } from "../../service/websocket/websocket";

export class ConsultSymbolUseCase {
  constructor(
    private symbol: string,
    private pathURL: string,
    private fileLog: FileLog | null,
    private enableLog: boolean | undefined,
    private createWebSocket: (
      symbol: string | null,
      pathURL: string
    ) => WebSocket
  ) {
    this.pathURL = pathURL;
    this.symbol = symbol;
  }

  execute() {
    const [serverMessages, setServerMessages] = useState<string[]>([]);
    const ws = this.createWebSocket(this.symbol.toLowerCase(), this.pathURL);

    ws.addEventListener("ping", (e) => {
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
        serverMessageList.push(mountedMessage);

        setServerMessages([...serverMessageList]);
      };
    }, []);

    return serverMessages;
  }
}
