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
        throw new RangeError(
          `[Ethereum] Timeout must be more than or equal to 0`
        );
      }
      const url = new URL(uri).toString();
      this.instance = new Web3(
        new Web3.providers.HttpProvider(url, { timeout })
      );
    } catch (e) {
      if (e.code == "ERR_INVALID_URL") {
        throw new Error(
          `[Ethereum] The URI provided for this DLT is not valid`
        );
      } else {
          throw e;
      }
    }
  }
}

export default EthereumProvider;
