import { TypeAccount, TypeProvider } from '../../types/sdk';
import FloydSDK from '../../core';

abstract class AbstractDLT {
  /** Provider configuration for the DLT */
  options: TypeProvider;

    /** Name of the DLT */
  name: string;

    /** Symbol used by the DLT */
  symbol: string;

  /** Instance of the FloydSDK  */
  sdk: any;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  accounts: TypeAccount[];

  /**
   * @param {FloydSDK} sdk
   * @param {TypeProvider} options
   */
  constructor(sdk: FloydSDK, options: TypeProvider = {}) {
    this.sdk = sdk;
    this.options = options;
    this.accounts = new Array<TypeAccount>();
    this.createProvider(options);
  }

  /**
   * Sets the accounts associated with the DLT
   * @param {string} privateKey
   */
  abstract addAccount(privateKey?: string): TypeAccount;

  /**
   * Set up provider
   * @param {options}
   */
  abstract createProvider(options: TypeProvider): void;
}

export default AbstractDLT;