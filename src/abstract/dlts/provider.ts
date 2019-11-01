import { TypeProvider } from "../../types";
import Web3 from "web3";

abstract class AbstractProvider {
  /** URI endpoint for the provider  */
  uri: string;

  /** Timeout in milliseconds (ms) */
  timeout: number;

  /** Instance of the Web3 provider */
  instance: Web3;

  constructor(options: TypeProvider) {
    if (options.uri == undefined || options.uri.length == 0) {
      throw new URIError();
    }
    this.uri = options.uri;
    this.timeout = !options.timeout || options.timeout < 0 ? 0 : options.timeout;
    this.setProvider(this.uri, this.timeout);
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract setProvider(uri: string, timeout: number): void;
}

export default AbstractProvider;
