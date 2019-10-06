import { TypeNetwork, TypeProvider } from '../types';

export const TESTNET: TypeNetwork = 'testnet';
export const MAINNET: TypeNetwork = 'mainnet';

class Provider {
  options: TypeProvider;
  net: TypeNetwork;

  constructor(options: TypeProvider = {}) {
    this.options = options;
    this.net = this.options.network || TESTNET;
  }
}

export default Provider;
