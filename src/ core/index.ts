import { TypeDLT, TypeNetwork, TypeSDK } from '../types';
import AbstractDLT from '../abstract/index';

class Crossledger {
  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts: { [key: string]: AbstractDLT } = {};

  /**
   * This is the network type that is being connected to
   */
  network: TypeNetwork;

  /**
   * @param {Object} options
   */
  constructor(options: TypeSDK) {
    this.network = options.provider && options.provider.network || "testnet";

    options.dlts.forEach((dltConfig: TypeDLT) => {
      const dlt = this.loadDLT(dltConfig);
      // this.dlts[dlt.name] = dlt;
    });
  }

  /**
   * Load the dlt to the Overledger SDK
   *
   * @param {Object} config
   *
   * @return {Provider}
   */
  private loadDLT(config: TypeDLT) {
  }
}

export default Crossledger;
