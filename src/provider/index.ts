import { TypeNetwork, TypeProvider } from '../types';

export const TESTNET: TypeNetwork = 'testnet';
export const MAINNET: TypeNetwork = 'mainnet';

class Provider {
  options: TypeProvider;
  network: TypeNetwork;

  constructor(options: TypeProvider = {}) {
    this.options = options;
    this.network = this.options.network || TESTNET;
  }
}

export default Provider;
