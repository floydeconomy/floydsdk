import { TypeNetwork, TypeProvider } from '../types';

export const TESTNET: TypeNetwork = 'testnet';
export const MAINNET: TypeNetwork = 'mainnet';

class Provider {
  settings: TypeProvider;
  net: TypeNetwork;

  constructor(options: TypeProvider = {}) {
    this.settings = options;
    this.net = this.settings.network || TESTNET;
  }
}

export default Provider;
