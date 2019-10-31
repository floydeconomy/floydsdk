import { TypeProvider } from '../../types';

abstract class AbstractProvider {
  settings: TypeProvider;

  constructor(options: TypeProvider) {
      this.settings = options;
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract createProvider(options: Object): void;
}

export default AbstractProvider;
