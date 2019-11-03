import AbstractDLT from "../dlt";
import { TypeDLT, InterfaceVechainTransaction, InterfaceVechainTransactionOptions, InterfaceVechainTransactionReceipt } from "../../../types/index";

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
    if (options.nonce && options.nonce < 0) {
      throw new Error("[Vechain] The nonce provided is invalid")
    }
    if (options.amount < 0) {
      throw new Error("[Vechain] The amount provided is invalid")
    }
    if (options.gas <= 0) {
      throw new Error("[Vechain] The gas provided is invalid")
    }
    if (options.gasPriceCoef <= 0) {
      throw new Error("[Vechain] The gasPriceCoef provided is invalid")
    }

    const transaction: InterfaceVechainTransaction = {
      from: options.from,
      to: to,
      value: options.amount,
      gas: options.gas ? options.gas : 21000,
      data: this.provider.instance.utils.asciiToHex(message),
      nonce: options.nonce ? options.nonce : 0,
      gasPriceCoef: options.gasPriceCoef ? options.gasPriceCoef : 128,
    };
    return transaction;  
  }
  
  /** @inheritdoc */
  public sendSignedTransaction(transaction: InterfaceVechainTransaction): InterfaceVechainTransactionReceipt {
    throw new Error('Method not implemented.');
  }
}

export default Vechain;
