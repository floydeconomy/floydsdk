import AbstractDLT from "../dlt";
import { TypeDLT } from '../../../utils/types';
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
}

export default Binance;
