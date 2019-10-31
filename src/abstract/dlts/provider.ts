import { TypeProvider } from '../../types';

abstract class AbstractProvider {
  /** URI endpoint for the provider  */
  uri: string;

  /** Timeout in milliseconds (ms) */
  timeout: number;

  constructor(options: TypeProvider) {
      this.uri = options.uri;
      this.timeout = !options.timeout || options.timeout < 0 ? 0 : options.timeout;
      this.setProvider(options);
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract setProvider(options: TypeProvider): void;
}

export default AbstractProvider;
