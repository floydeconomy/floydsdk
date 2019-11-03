import AbstractDLT from "../dlt";
import { TypeDLT, InterfaceBinanceTransaction, InterfaceBinanceTransactionOptions } from "../../../types/index";

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
  public sendSignedTransaction(transaction: InterfaceBinanceTransaction) {
    throw new Error('Method not implemented.');
  }
}

export default Binance;
