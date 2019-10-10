import { TypeNetwork, TypeProvider } from '../types';

export const TESTNET: TypeNetwork = 'testnet';
export const MAINNET: TypeNetwork = 'mainnet';

abstract class Provider {
  settings: TypeProvider;
  net: TypeNetwork;

  constructor(options: TypeProvider = {}) {
    this.validateProvider(options);
    this.settings = options;
    this.net = this.settings.network || TESTNET;
    this.createProvider(options);
  }

  /**
   * This creates the provider based on the options given.
   * @param options
   */
  abstract createProvider(options: Object): void;

  /**
   * This validates the provider given according to the DLT.
   * @param {options} options
   */
  abstract validateProvider(options: Object): void;
}

export default Provider;
