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

  /** 
   * @inheritdoc
   * Current implementation only supports 
   *   nonce: number
   *   gasPrice: number | string | BN
   *   gas: number | string
   *   value: number | string | BN
   *   from: string | number
   */
  public buildTransaction(to: string, message: string, options: InterfaceEthereumTransactionOptions): InterfaceEthereumTransaction {
    if (options.nonce !== undefined && options.nonce < 0) {
      throw new Error("[Ethereum] The nonce provided is invalid")
    }

    if (options.nonce !== undefined && options.value < 0) {
      throw new Error("[Ethereum] The amount provided is invalid")
    }

    if (options.nonce !== undefined && options.gas <= 0) {
      throw new Error("[Ethereum] The gas provided is invalid")
    }
    
    if (options.nonce !== undefined && options.gasPrice <= 0) {
      throw new Error("[Ethereum] The gasPrice provided is invalid")
    }

    const transaction: InterfaceEthereumTransaction = {
      nonce: options.nonce ? options.nonce : 0,
      gasPrice: options.gasPrice ? options.gasPrice : 1e9,
      gas: options.gas ? options.gas : 1,
      value: options.value? options.value: 0,
      data: this.provider.instance.utils.asciiToHex(message),
      from: options.from,
      to: to
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
