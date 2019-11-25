import { TypeAccount, TypeProvider, TypeDLT } from "../../utils/types/index";
import FloydSDK from "../../core";
import AbstractProvider from "./provider";
import {
  InterfaceTransactionOptions,
  InterfaceTransaction,
  InterfaceTransactionReceipt
} from "../../utils/interfaces";

abstract class AbstractDLT {
  /** Provider configuration for the DLT */
  public provider: AbstractProvider;

  /** Name of the DLT */
  public name: string;

  /** Symbol used by the DLT */
  public symbol: string;

  /** Instance of the FloydSDK  */
  public sdk: any;

  /** This handles all the accounts in the DLT, whereby, the key is the address */
  public accounts: TypeAccount[] = new Array<TypeAccount>();

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
   * @param {name} string
   * @param {provider} TypeProvider
   * @return {AbstractProvider}
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
  public abstract buildTransaction(
    to: string,
    message: string,
    options: InterfaceTransactionOptions
  ): InterfaceTransaction;

  /**
   * Sends a singed transaction to the blockchain
   * @param {signature} Buffer
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendSignedTransaction(
    signature: Buffer
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Sends a transaction to the blockchain
   * @param {transaction} InterfaceTransaction
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendTransaction(
    transaction: InterfaceTransaction
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Signs a transaction with the private key
   * @param {transaction} InterfaceTransaction
   * @param {pk} Buffer
   * @return {any}
   */
  public abstract signTransaction(
    transaction: InterfaceTransaction,
    pk: Buffer
  ): any;

  /**
   * Creates a new contract
   * @return {InterfaceContract}
   */
  public abstract createContract(contract: Buffer): any;

  /**
   * Deploys the contract
   * @return {any}
   */
  public abstract deployContract(contract: any): any;

  /**
   * Creates a new account
   * @return {TypeAccount}
   */
  public abstract createAccount(): TypeAccount;

  /**
   * Convert private key to account
   * @return {TypeAccount}
   */
  public abstract privateKeyToAccount(pk: string): TypeAccount;

  /**
   * Adds account to the wallet manager
   * @param {TypeAccount?} account
   * @return {TypeAccount}
   */
  public abstract addAccount(account?: TypeAccount): TypeAccount;

  /**
   * Subscribe to certain blockchain events
   * @param {event} string
   * @return {boolean}
   */
  public abstract subscribe(event: string): boolean;

  /**
   * Clear all the subscriptions
   */
  public abstract clearSubscriptions(): boolean;
}

export default AbstractDLT;
