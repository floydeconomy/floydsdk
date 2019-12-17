import { AbstractProvider } from "@floyd/abstract";
import Web3 from "web3";
import { TypeProvider } from "@floyd/utils";

export class EthereumProvider extends AbstractProvider {
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
