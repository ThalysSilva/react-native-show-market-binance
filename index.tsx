import { FileSystemAdapter } from "./adapters/filesystem/FileLogger/FileSystem-adapter";
import { createWebSocket } from "./service/websocket/websocket";
import { ConsultSymbolUseCase } from "./useCases/binance/consult-symbol-use-case";
import { ConsultVariousSymbolUseCase } from "./useCases/binance/consult-various-symbols-use-case";

const fileSystemAdapter = new FileSystemAdapter();
const symbolsArray = [
  "btcbrl",
  "ethbrl",
  "usdtbrl",
  "bnbbrl",
  "xrpbrl",
  "solbrl",
];

export const ReactNativeShowMarketBinance = () => {
  function ConsultSymbol(symbol: string, enableLog?: boolean) {
    const newConsultSymbol = new ConsultSymbolUseCase(
      symbol,
      "@miniTicker",
      fileSystemAdapter,
      enableLog,
      createWebSocket
    );
    return newConsultSymbol.execute();
  }
  function ConsultVariousSymbols(symbols: string[], enableLog?: boolean) {
    const newConsultVariousSymbols = new ConsultVariousSymbolUseCase(
      symbols,
      "miniTicker",
      fileSystemAdapter,
      enableLog,
      createWebSocket
    );
    return newConsultVariousSymbols.execute();
  }

  function InstantMethodForTest(enableLog?: boolean) {
    const newConsultVariousSymbols = new ConsultVariousSymbolUseCase(
      symbolsArray,
      "miniTicker",
      fileSystemAdapter,
      enableLog,
      createWebSocket
    );
    return newConsultVariousSymbols.execute();
  }

  return { ConsultSymbol, ConsultVariousSymbols, InstantMethodForTest };
};
