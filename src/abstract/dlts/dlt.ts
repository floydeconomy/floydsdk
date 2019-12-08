import { TypeAccount, TypeProvider, TypeDLT } from "../../utils/types/index";
import FloydSDK from "../../core";
import AbstractProvider from "./provider";
import {
  InterfaceTransactionOptions,
  InterfaceTransaction,
  InterfaceTransactionReceipt,
  InterfaceContractOptions,
  InterfaceContractReceipt,
  InterfaceContractDeployOptions
} from "../../utils/interfaces";
import Contract from "web3-eth-contract";

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
   * @param {TypeDLT} options
   */
  constructor(sdk: FloydSDK, options: TypeDLT) {
    this.sdk = sdk;
    this.provider = this.loadProvider(options.name, options.provider);
  }

  /**
   * Load the dlt to the Overledger SDK
   * @param {string} name
   * @param {TypeProvider} provider
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
   * @return {InterfaceTransaction}
   */
  public abstract buildTransaction(
    to: string,
    message: string,
    options: InterfaceTransactionOptions
  ): InterfaceTransaction;

  /**
   * Sends a singed transaction to the blockchain
   * @param {Buffer} signature
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendSignedTransaction(
    signature: Buffer
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Sends a transaction to the blockchain
   * @param {InterfaceTransaction} transaction
   * @return {Promise<InterfaceTransactionReceipt>}
   */
  public abstract sendTransaction(
    transaction: InterfaceTransaction
  ): Promise<InterfaceTransactionReceipt>;

  /**
   * Signs a transaction with the private key
   * @param {InterfaceTransaction} transaction
   * @param {Buffer} pk
   */
  public abstract signTransaction(
    transaction: InterfaceTransaction,
    pk: Buffer
  ): any;

  /**
   * Creates a new contract
   *
   * // TODO: return should not be Web3.eth.Contract
   * @param {InterfaceContractOptions} options
   * @return {Web3.eth.Contract}
   */
  public abstract createContract(
    options: InterfaceContractOptions
  ): Contract.Contract;

  /**
   * Deploys the contract
   *
   * Safety: UNSAFE
   * Current implementation only checks for fromAddress and data, however,
   * it uses default values if they are not passed.
   * // TODO: it should also ensure that gas and gasPrice is included.
   * TODO: it should accept a Interface as parameters
   * TODO: parameter contract should not be any
   * TODO: return should not be any
   * TODO: remove Contrat.Contract from args
   *
   * @param {any} contract
   * @param {data?} string
   * @return {InterfaceContractReceipt}
   */
  public abstract deployContract(args: InterfaceContractDeployOptions): any;

  /**
   * Creates a new account
   * @return {TypeAccount}
   */
  public abstract createAccount(): TypeAccount;

  /**
   * Convert private key to account
   * @param {Buffer} key
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
   * @param {string} event
   * @return {boolean}
   */
  public abstract subscribe(event: string): boolean;

  /**
   * Clear all the subscriptions
   * @return {boolean}
   */
  public abstract clearSubscriptions(): boolean;
}

export default AbstractDLT;
