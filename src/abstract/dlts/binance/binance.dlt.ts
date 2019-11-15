import AbstractDLT from "../dlt";
import { TypeDLT, TypeAccount } from '../../../utils/types';
import { InterfaceBinanceTransactionOptions, InterfaceBinanceTransaction, InterfaceBinanceTransactionReceipt } from '../../../utils/interfaces';

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
  public buildTransaction(to: string, message: string, options: InterfaceBinanceTransactionOptions): InterfaceBinanceTransaction {
    throw new Error('Method not implemented.');
  }
  
  /** @inheritdoc */
  public sendSignedTransaction(signature: Buffer): Promise<InterfaceBinanceTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public sendTransaction(transaction: InterfaceBinanceTransaction): Promise<InterfaceBinanceTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public signTransaction(transaction: InterfaceBinanceTransaction, pk: Buffer): Buffer {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public createContract(contract: Buffer) {
    throw new Error('Method not implemented.');
  }
  
  /** @inheritdoc */
  public deployContract(contract: any) {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public createAccount(): TypeAccount {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public privateKeyToAccount(key: Buffer): TypeAccount {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public subscribe(event: string): boolean {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public clearSubscriptions(): boolean {
    throw new Error('Method not implemented.');
  }
}

export default Binance;
