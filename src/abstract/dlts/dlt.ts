import { TypeAccount, TypeProvider, TypeDLT } from '../../types/sdk';
import FloydSDK from '../../core';
import Provider from '../../provider';

abstract class AbstractDLT {
  /** Provider configuration for the DLT */
  provider: Provider;

  /** Name of the DLT */
  name: string;

    /** Symbol used by the DLT */
  symbol: string;

  /** Instance of the FloydSDK  */
  sdk: any;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  accounts: TypeAccount[] = new Array<TypeAccount>();

  /**
   * @param {FloydSDK} sdk
   * @param {TypeProvider} options
   */
  constructor(sdk: FloydSDK, options: TypeDLT) {
    this.sdk = sdk;
    this.loadProvider(options.provider);
  }

  /**
   * Sets the accounts associated with the DLT
   * @param {string} privateKey
   */
  abstract addAccount(privateKey?: string): TypeAccount;


  /**
   * Load the dlt to the Overledger SDK
   * @param {Object} config
   * @return { AbstractDLT }
   */
  private loadProvider(options: TypeProvider) : void {
    try {
      // const provider = require(`./${this.name}.provider`).default;
      // console.log(provider);
      // // return new provider(options);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(`The Provider for this DLT is not present, please add the provider for ${this.name} manually.`);
      }
    }
  }

}

export default AbstractDLT;