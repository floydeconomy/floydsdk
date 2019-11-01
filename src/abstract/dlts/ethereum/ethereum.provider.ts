import AbstactProvider from "../provider";
import { TypeProvider } from "../../../types";
import Web3 from "web3";
import { URL } from "url";

export class EthereumProvider extends AbstactProvider {
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
      this.instance = new Web3(
        new Web3.providers.HttpProvider(url, { timeout })
      );
    } catch (e) {
      if (e.code == "ERR_INVALID_URL") {
        throw new URIError(`[Ethereum] The URI provided for this DLT is not valid`);
      } else if (e instanceof RangeError) {
        throw new RangeError(`[Ethereum] Timeout must be more than or equal to 0`);
      } else {
        throw new Error("[Ethereum] There was an issue creating the provider");
      }
    }
  }
}

export default EthereumProvider;
