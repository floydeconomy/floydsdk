import AbstractDLT from "../dlt";
import { TypeDLT  } from "../../../utils/types/index";
import { InterfaceVechainTransactionOptions, InterfaceVechainTransaction, InterfaceVechainTransactionReceipt, InterfaceTransaction } from '../../../utils/interfaces';
import {
  cry,
  Transaction,
} from 'thor-devkit'

class Vechain extends AbstractDLT {
  /** @inheritdoc */
  name: string = "vechain";
  
  /** @inheritdoc */
  symbol: string = "vet";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }

  /** 
   * @inheritdoc
   * Current implementation only supports 
   *   nonce: number
   *   from: string
   *   gasPriceCoef: number
   *   gas: number
   *   amount: number
   */
  public buildTransaction(to: string, message: string, options: InterfaceVechainTransactionOptions): InterfaceVechainTransaction {
    if (options.nonce && options.nonce < 0) {
      throw new Error("[Vechain] The nonce provided is invalid");
    }
    if (options.value < 0) {
      throw new Error("[Vechain] The amount provided is invalid");
    }
    if (options.gas <= 0) {
      throw new Error("[Vechain] The gas provided is invalid");
    }
    
    if (options.gasPrice <= 0) {
      console.log(options.gasPrice,'test');
      throw new Error("[Vechain] The gasPriceCoef provided is invalid");
    }

    const transaction: InterfaceVechainTransaction = {
      from: options.from,
      to: to,
      value: options.value,
      gas: options.gas ? options.gas : 21000,
      gasPriceCoef: options.gasPrice ? options.gasPrice : 128,
      data: this.provider.instance.utils.asciiToHex(message),
      nonce: options.nonce ? options.nonce : 0,
      clauses: [],
      chainTag: 0x9a,
      expiration: 32,
      dependsOn: null,
      blockRef: "0x0000000000000000",
    };
    return transaction;  
  }
  
  /** @inheritdoc */
  public sendSignedTransaction(signature: Buffer):  Promise<InterfaceVechainTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public sendTransaction(transaction: InterfaceVechainTransaction): Promise<InterfaceVechainTransactionReceipt> {
    throw new Error('Method not implemented.');
  }

  /** @inheritdoc */
  public signTransaction(transaction: InterfaceVechainTransaction, pk: Buffer): Buffer {
    // const pub = cry.secp256k1.derivePublicKey(pk);
    // const address = '0x' + cry.publicKeyToAddress(pub).toString('hex');
    // if (!cry.isAddress(address)) {
    //   console.log(address);
    //   throw new Error('[Vechain] Private key provided is invalid')
    // }
    let body: Transaction.Body = transaction
    let tx = new Transaction(body)
    let signingHash = cry.blake2b256(tx.encode())
    tx.signature = cry.secp256k1.sign(signingHash, pk)
    return tx.signature;
  }
}

export default Vechain;
