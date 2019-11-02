import AbstactProvider from "../provider";
import { TypeProvider } from "../../../types";
import { URL } from "url";
import BnbApiClient from '@binance-chain/javascript-sdk';

export class BinanceProvider extends AbstactProvider {
  /** @inheritdoc */
  constructor(options: TypeProvider) {
    super(options);
  }

  /** @inheritdoc */
  setProvider(uri: string, timeout: number): void {
    try {
      if (timeout < 0) {
        throw new RangeError();
      }
      const url = new URL(uri).toString();
      this.instance = new BnbApiClient(url);
      this.instance.initChain();
    } catch (e) {
      if (e.code == "ERR_INVALID_URL") {
        throw new URIError(`[Binance] The URI provided for this DLT is not valid`);
      } else if (e instanceof RangeError) {
        throw new RangeError(`[Binance] Timeout must be more than or equal to 0`);
      } else {
        throw new Error("[Binance] There was an issue creating the provider");
      }
    }
  }
}

export default BinanceProvider;
