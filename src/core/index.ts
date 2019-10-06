import { TypeDLT, TypeNetwork, TypeSDK, TypeProvider } from '../types';
import AbstractDLT from '../abstract/index';

class CrossledgerSDK {
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
    // validate
    try {
      this.validateDLT(options.dlts);

      // defaults to testnet if not provided
      this.network = options.provider && options.provider.network || "testnet";

      // create dlts
      // options.dlts.forEach((dltConfig: TypeDLT) => {
      //   const dlt = this.loadDLT(dltConfig);
      //   // this.dlts[dlt.name] = dlt;
      // });
    } catch (e) {
      throw(e);
    }
  }

  /**
   * Validate the provided options
   * @param options 
   */
  private validateDLT(dlts: TypeDLT[]): void {
    if (!dlts || dlts.length === 0) {
      throw new Error('There arent any DLTs provided.');
    }
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

export default CrossledgerSDK;
