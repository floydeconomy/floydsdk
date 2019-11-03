import { TypeAccount, TypeProvider, TypeDLT, InterfaceTransaction, InterfaceTransactionOptions } from "../../types/index";
import FloydSDK from "../../core";
import AbstractProvider from "./provider";

abstract class AbstractDLT {
  /** Provider configuration for the DLT */
  provider: AbstractProvider;

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
    this.provider = this.loadProvider(options.name, options.provider);
  }

  /**
   * Load the dlt to the Overledger SDK
   * @param {Object} config
   * @return { AbstractDLT }
   */
  public loadProvider(name: string, provider: TypeProvider): AbstractProvider {
    try {
      const dltprovider = require(`../../abstract/dlts/${name}/${name}.provider`)
        .default;
      return new dltprovider(provider);
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          `[Provider] The Provider for this DLT is not present, please add the provider for ${name} manually.`
        );
      } else {
        throw e;
      }
    }
  }

  /**
   * Build the transaction
   * @param {string} to
   * @param {string} message
   * @param {TransactionOptions} options
   */
  public abstract buildTransaction(to: string, message: string, options: InterfaceTransactionOptions): InterfaceTransaction;

  /**
   * Creates transaction based on parameters provided
   * @param {TypeTransaction} options
   */
  public abstract sendSignedTransaction(transaction: InterfaceTransaction);
}

export default AbstractDLT;
