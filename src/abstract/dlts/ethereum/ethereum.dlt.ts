import AbstractDLT from "../dlt";
import { TypeDLT, InterfaceEthereumTransactionOptions, InterfaceEthereumTransaction } from "../../../types/index";

class Ethereum extends AbstractDLT {
  /** @inheritdoc */
  name: string = "ethereum";
  
  /** @inheritdoc */
  symbol: string = "eth";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }

  /** @inheritdoc */
  public buildTransaction(to: string, message: string, options: InterfaceEthereumTransactionOptions): InterfaceEthereumTransaction {
    const transaction: InterfaceEthereumTransaction = {
      nonce: options.nonce,
      to: to,
      gas: options.gas,
      gasPrice: options.gasPrice,
      value: options.amount,
      data: this.provider.instance.utils.asciiToHex(message),
    };
    return transaction;
  }
  
  /** @inheritdoc */
  public sendSignedTransaction(transaction: InterfaceEthereumTransaction) {
    throw new Error('Method not implemented.');
  }
}

export default Ethereum;
