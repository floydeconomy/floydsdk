import AbstractDLT from "../dlt";
import { TypeDLT, TypeAccount } from "../../../utils/types";
import {
  InterfaceBinanceTransactionOptions,
  InterfaceBinanceTransaction,
  InterfaceBinanceTransactionReceipt,
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractDeployOptions
} from "../../../utils/interfaces";
import Contract from "web3-eth-contract";

/** @inheritdoc */
class Binance extends AbstractDLT {
  /** @inheritdoc */
  name: string = "binance";

  /** @inheritdoc */
  symbol: string = "bnb";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }

  /** @inheritdoc */
  public buildTransaction(
    to: string,
    message: string,
    options: InterfaceBinanceTransactionOptions
  ): InterfaceBinanceTransaction {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public sendSignedTransaction(
    signature: Buffer
  ): Promise<InterfaceBinanceTransactionReceipt> {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public sendTransaction(
    transaction: InterfaceBinanceTransaction
  ): Promise<InterfaceBinanceTransactionReceipt> {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public signTransaction(
    transaction: InterfaceBinanceTransaction,
    pk: Buffer
  ): Buffer {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public createContract(options: InterfaceContractOptions): Contract.Contract {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public deployContract(args: InterfaceContractDeployOptions): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public createAccount(): TypeAccount {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public privateKeyToAccount(pk: string): TypeAccount {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public addAccount(): TypeAccount {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public subscribe(event: string): boolean {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public clearSubscriptions(): boolean {
    throw new Error("Method not implemented.");
  }
}

export default Binance;
