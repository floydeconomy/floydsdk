import AbstactProvider from "../provider";
import { TypeProvider } from "../../../types";
import BncClient from "@binance-chain/javascript-sdk";

export class BinanceProvider extends AbstactProvider {
  /** @inheritdoc */
  constructor(options: TypeProvider) {
    super(options);
  }

  /** @inheritdoc */
  setProvider(url: string, timeout: number): void {
    this.instance = new BncClient(url);
  }
}

export default BinanceProvider;
