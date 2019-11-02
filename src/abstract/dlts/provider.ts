import { TypeProvider } from "../../types";

abstract class AbstractProvider {
  /** URI endpoint for the provider  */
  uri: string;

  /** Timeout in milliseconds (ms) */
  timeout: number;

  /** Instance of the Web3 provider */
  instance: any;

  constructor(options: TypeProvider) {
    this.uri = options.uri;
    this.timeout =
      !options.timeout || options.timeout < 0 ? 0 : options.timeout;

    try {
      this.setProvider(this.uri, this.timeout);
    } catch (e) {
      throw e;
    }
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract setProvider(uri: string, timeout: number): void;
}

export default AbstractProvider;
