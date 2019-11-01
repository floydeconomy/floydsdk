import AbstactProvider from "../provider";
import { TypeProvider } from "../../../types";
import Web3 from "web3";
import { thorify } from "thorify";
import { URL } from "url";

export class VechainProvider extends AbstactProvider {
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
      this.instance = thorify(new Web3(url), url, timeout);
    } catch (e) {
      if (e.code == "ERR_INVALID_URL") {
        throw new URIError(`[Vechain] The URI provided for this DLT is not valid`);
      } else if (e instanceof RangeError) {
        throw new RangeError(`[Vechain] Timeout must be more than or equal to 0`);
      } else {
        throw new Error("[Vechain] There was an issue creating the provider");
      }
    }
  }
}

export default VechainProvider;
