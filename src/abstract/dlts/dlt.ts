import { TypeAccount } from '../../types/sdk';

abstract class AbstractDLT {
  options: Object;
  name: string;
  symbol: string;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  accounts: TypeAccount[];

  /**
   * @param {Object} options
   */
  constructor(options: Object = {}) {
    this.options = options;
    this.accounts = new Array<TypeAccount>();
  }

  /**
   * Sets the accounts associated with the DLT
   * @param {string} privateKey
   */
  abstract addAccount(privateKey?: string): TypeAccount;
}

export default AbstractDLT;