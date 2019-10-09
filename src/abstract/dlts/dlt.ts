import { TypeAccount, TypeProvider } from '../../types/sdk';

abstract class AbstractDLT {
  options: Object;

    /** Name of the DLT */
  name: string;

    /** Symbol used by the DLT */
  symbol: string;
  sdk: any;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  accounts: TypeAccount[];

  /**
   * @param {Object} options
   */
  constructor(sdk: any, options: Object = {}) {
    this.sdk = sdk;
    this.options = options;
    this.accounts = new Array<TypeAccount>();
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