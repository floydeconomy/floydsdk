import Provider, { TESTNET } from '@overledger/provider';
import AbstractDLT from '@overledger/dlt-abstract';
import { APICall, SDKOptions, DLTOptions, SignOptions, SignedTransactionResponse, SequenceDataRequest, APICallWrapper, DLTAndAddressArray } from '@overledger/types';
import { } from '../types';

class Crossledger {
  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts: { [key: string]: AbstractDLT } = {};

  network: networkOptions;
  provider: any; // TODO: define the type

  /**
   * @param {string} mappId
   * @param {string} bpiKey
   * @param {Object} options
   */
  constructor(options: SDKOptions) {
    this.network = options.provider && options.provider.network || TESTNET;

    options.dlts.forEach((dltConfig: DLTOptions) => {
      const dlt = this.loadDLT(dltConfig);
      this.dlts[dlt.name] = dlt;
    });
  }

  private loadDLT(config: DLTOptions): AbstractDLT {

  }

//   /**
//    * Load the dlt to the Overledger SDK
//    *
//    * @param {Object} config
//    *
//    * @return {Provider}
//    */
//   private loadDlt(config: DLTOptions): AbstractDLT {
//     // Need to improve this loading
//     const dltName = `dlt-${config.dlt}`;
//     try {
//       const provider = require(`@overledger/${dltName}`).default;

//       return new provider(this, config);
//     } catch (error) {
//       if (error.code === 'MODULE_NOT_FOUND') {
//         throw `Could not find the package for this DLT. Please install @overledger/${dltName} manually`;
//       }
//     }
//   }
  
//   public getBalances(array: DLTAndAddressArray): AxiosPromise<Object> {
//     return this.request.post('/balances', array);
//   }
}

export default Crossledger;
