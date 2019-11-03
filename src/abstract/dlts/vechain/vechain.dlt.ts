import AbstractDLT from "../dlt";
import { TypeDLT, InterfaceVechainTransaction, InterfaceVechainTransactionOptions } from "../../../types/index";

class Vechain extends AbstractDLT {
  /** @inheritdoc */
  name: string = "vechain";
  
  /** @inheritdoc */
  symbol: string = "vet";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }

  /** @inheritdoc */
  public buildTransaction(to: string, message: string, options: InterfaceVechainTransactionOptions): InterfaceVechainTransaction {
    const transaction: InterfaceVechainTransaction = {
      nonce: options.nonce,
      to: to,
      value: options.amount,
      data: this.provider.instance.utils.asciiToHex(message),
    };
    return transaction;  
  }
  
  /** @inheritdoc */
  public sendSignedTransaction(transaction: InterfaceVechainTransaction) {
    throw new Error('Method not implemented.');
  }
}

export default Vechain;
