import AbstactProvider from "../provider";
import { TypeProvider } from "../../../types";
import Web3 from "web3";

export class EthereumProvider extends AbstactProvider {
  /** @inheritdoc */
  constructor(options: TypeProvider) {
    super(options);
  }

  /** @inheritdoc */
  setProvider(url: string, timeout: number): void {
    this.instance = new Web3(new Web3.providers.HttpProvider(url, { timeout }));
  }
}

export default EthereumProvider;
