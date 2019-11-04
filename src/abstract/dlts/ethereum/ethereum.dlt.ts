import AbstractDLT from "../dlt";
import { TypeDLT } from '../../../utils/types';
import { InterfaceEthereumTransactionOptions, InterfaceEthereumTransaction, InterfaceEthereumTransactionReceipt } from '../../../utils/interfaces';

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
  public sendSignedTransaction(signature: string):  Promise<InterfaceEthereumTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public sendTransaction(transaction: InterfaceEthereumTransaction): Promise<InterfaceEthereumTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public signTransaction(transaction: InterfaceEthereumTransaction, pk: string) {
    throw new Error('Method not implemented.');
  }
}

export default Ethereum;
