import { TypeProvider } from "../../utils/types";
import { URL } from "url";
import Web3 from 'web3';

abstract class AbstractProvider {
  /** URI endpoint for the provider  */
  uri: string;

  /** Timeout in milliseconds (ms) */
  timeout: number;

  /** Instance of the Web3 provider */
  instance: Web3;

  /** The network that is connected */
  network: string;

  /**
   * @param {TypeProvider} options
   */  
  constructor(options: TypeProvider) {
    this.uri = options.uri;
    this.timeout =
      !options.timeout || options.timeout < 0 ? 0 : options.timeout;

    try {
      this._createProvider();
    } catch (e) {
      throw e;
    }
  }

  /**
   * This is the method that creates the provider for a given uri.
   */
  private _createProvider(): void {
    try {
      const url = new URL(this.uri).toString();
      this.setProvider(url, this.timeout);
    } catch (e) {
      if (e.code == "ERR_INVALID_URL") {
        throw new URIError(
          `[Provider]-[uri:${this.uri}] The URI provided for this DLT is not valid`
        );
      } else {
        throw new Error(
          `[Provider]-[uri:${this.uri}] There was an issue creating the provider`
        );
      }
    }
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract setProvider(url: string, timeout: number): void;
}

export default AbstractProvider;
