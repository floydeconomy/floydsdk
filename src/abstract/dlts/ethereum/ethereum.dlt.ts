import AbstractDLT from "../dlt";
import { TypeDLT } from '../../../utils/types';
import { InterfaceEthereumTransactionOptions, InterfaceEthereumTransaction, InterfaceEthereumTransactionReceipt } from '../../../utils/interfaces';
import { Transaction } from 'ethereumjs-tx'

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
      value: options.value,
      data: this.provider.instance.utils.asciiToHex(message)
    };
    return transaction;
  }

  /** @inheritdoc */
  public sendSignedTransaction(signature: Buffer): Promise<InterfaceEthereumTransactionReceipt> {
    return new Promise((resolve, reject) => {
      this.provider.instance.eth
        .sendSignedTransaction("0x" + signature.toString("hex"))
        .then((data) => {
          const receipt: InterfaceEthereumTransactionReceipt = data;
          return resolve(receipt);
        })
        .catch((err) => {
          return reject(new Error('[Ethereum] Something went wrong when sending the signed transaction.'));
        });
    });
  }

  /** @inheritdoc */
  public sendTransaction(transaction: InterfaceEthereumTransaction): Promise<InterfaceEthereumTransactionReceipt> {
    return new Promise((resolve, reject) => {
      this.provider.instance.eth
        .sendTransaction(transaction)
        .then((data) => {
          const receipt: InterfaceEthereumTransactionReceipt = data;
          return resolve(receipt);
        })
        .catch((err) => {
          return reject(new Error('[Ethereum] Something went wrong when sending the transaction.'));
        });
    });
  }

  /** @inheritdoc */
  public signTransaction(transaction: InterfaceEthereumTransaction, pk: Buffer): Buffer {
    var tx = new Transaction(transaction);
    tx.sign(pk);
    const serializedTx = tx.serialize();
    return serializedTx;
  }
}

export default Ethereum;
