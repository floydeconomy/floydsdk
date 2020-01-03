import {
  ITransactionOptions,
  ITransaction,
  ITransactionReceipt,
  IContractOptions,
  IContractDeployOptions
} from "@floyd/interfaces";
import { TypeAccount, TypeProvider, TypeDLT } from "@floyd/types";
import FloydSDK from "@floyd/core";
import AbstractProvider from "./provider";

/**
 * This class serves as the base class that maintains all implementation
 * details related to the blockchain.
 *
 * It handles accounts, subscriptions, transactions and contracts.
 *
 * @author Jeevan Pillay
 */
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
  public loadProvider(name: string, options: TypeProvider): AbstractProvider {
    try {
      const { provider } = require(`@floyd/${name}`);
      return new provider(options);
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
   * @param {ITransactionOptios} options
   */
  public abstract buildTransaction(options: ITransactionOptions): ITransaction;

  /**
   * Sends a singed transaction to the blockchain
   * @param {string | Buffer} signature if string, must be prefixed with 0x, buffers will be automatically converted
   * @return {Promise< ITransactionReceipt>}
   */
  public abstract sendSignedTransaction(
    signature: string | Buffer
  ): Promise<ITransactionReceipt>;

  /**
   * Sends a transaction to the blockchain
   * @param { ITransaction} transaction
   * @return {Promise< ITransactionReceipt>}
   */
  public abstract sendTransaction(
    transaction: ITransaction
  ): Promise<ITransactionReceipt>;

  /**
   * Signs a transaction with the private key
   * @param { ITransaction} transaction the transaction to sign
   * @param {string | Buffer} pk the private key
   * @return {string} the raw transaction in string with 0x prefixed in front of it
   */
  public abstract signTransaction(
    transaction: ITransaction,
    pk: string | Buffer
  ): string;

  /**
   * Creates a new contract
   * // TODO: should return a standarised interface
   * @return { IContract}
   */
  public abstract createContract(options: IContractOptions): any;

  /**
   * Deploys the contract
   * // TODO: should not return promise any instead a defined interface
   * @return {any}
   */
  public abstract deployContract(args: IContractDeployOptions): Promise<any>;

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
