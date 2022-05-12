import { FileLog } from "../file-log-interface";
import * as FileSystem from 'expo-file-system';

export class FileSystemAdapter implements FileLog {
  async createLog(message: string) {
    if (!message) return;
    const path = `${FileSystem.documentDirectory}Log_ReactNativeShowMarketBinance.txt`;
    await FileSystem.writeAsStringAsync(path,message)
  }
}
