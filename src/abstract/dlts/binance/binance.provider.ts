import AbstactProvider from "../provider";
import BncClient from "@binance-chain/javascript-sdk";
import { TypeProvider } from '../../../utils/types';

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
