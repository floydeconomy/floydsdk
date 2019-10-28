import { TypeNetwork, TypeProvider } from '../../types';

export const TESTNET: TypeNetwork = 'testnet';
export const MAINNET: TypeNetwork = 'mainnet';

abstract class AbstractProvider {
  settings: TypeProvider;
  network: TypeNetwork;

  constructor(options: TypeProvider) {
      // defaults to testnet if not provided
      this.network = (options.network) || "testnet";
      
    // this.net = this.settings.network || TESTNET;
    // this.createProvider(options);
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract createProvider(options: Object): void;
}

export default AbstractProvider;
