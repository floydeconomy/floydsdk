import AbstractDLT from "../dlt";
import { TypeDLT, TypeAccount } from "../../../utils/types/index";
import {
  InterfaceVechainTransactionOptions,
  InterfaceVechainTransaction,
  InterfaceVechainTransactionReceipt,
  InterfaceContract,
  InterfaceContractReceipt,
  InterfaceContractOptions,
  InterfaceContractDeployOptions
} from "../../../utils/interfaces";
import { cry, Transaction } from "thor-devkit";
import Contract from "web3-eth-contract";

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
  public buildTransaction(
    to: string,
    message: string,
    options: InterfaceVechainTransactionOptions
  ): InterfaceVechainTransaction {
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
      blockRef: "0x0000000000000000"
    };
    return transaction;
  }

  /** @inheritdoc */
  public sendSignedTransaction(
    signature: Buffer
  ): Promise<InterfaceVechainTransactionReceipt> {
    return new Promise((resolve, reject) => {
      this.provider.instance.eth
        .sendSignedTransaction("0x" + signature.toString("hex"))
        .then(data => {
          const receipt: InterfaceVechainTransactionReceipt = {
            gasUsed: data.gasUsed,
            blockHash: data.blockHash,
            blockNumber: data.blockNumber,
            status: data.status,
            cumulativeGasUsed: data.cumulativeGasUsed,
            from: data.from,
            to: data.to,
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex
          };
          return resolve(receipt);
        })
        .catch(err => {
          return reject(
            new Error(
              "[Vechain] Something went wrong when sending the signed transaction."
            )
          );
        });
    });
  }

  /** @inheritdoc */
  public sendTransaction(
    transaction: InterfaceVechainTransaction
  ): Promise<InterfaceVechainTransactionReceipt> {
    return new Promise((resolve, reject) => {
      this.provider.instance.eth
        .sendTransaction(transaction)
        .then(data => {
          const receipt: InterfaceVechainTransactionReceipt = {
            gasUsed: data.gasUsed,
            blockHash: data.blockHash,
            blockNumber: data.blockNumber,
            status: data.status,
            cumulativeGasUsed: data.cumulativeGasUsed,
            from: data.from,
            to: data.to,
            transactionHash: data.transactionHash,
            transactionIndex: data.transactionIndex
          };
          return resolve(receipt);
        })
        .catch(err => {
          return reject(
            new Error(
              "[Vechain] Something went wrong when sending the transaction."
            )
          );
        });
    });
  }

  /** @inheritdoc */
  public signTransaction(
    transaction: InterfaceVechainTransaction,
    pk: Buffer
  ): Buffer {
    let body: Transaction.Body = transaction;
    let tx = new Transaction(body);
    let signingHash = cry.blake2b256(tx.encode());
    tx.signature = cry.secp256k1.sign(signingHash, pk);
    return tx.signature;
  }

  /**
   * @inheritdoc
   * // TODO: should use its own Interface called InterfaceVechainContractOptions
   * // TODO: should return its own Interface or Class and not Web3.eth.Contract
   * @param {InterfaceContractOptions} options
   * @return {Web3.eth.Contract}
   */
  public createContract(options: InterfaceContractOptions): Contract.Contract {
    if (options.jsonInterface.length < 1) {
      throw new Error("[Vechain] The ABI provided is invalid");
    }
    try {
      const contract = new this.provider.instance.eth.Contract(
        options.jsonInterface,
        options.address,
        options.options
      );
      return contract;
    } catch {
      throw new Error("[Vechain] Something went wrong with contract creation");
    }
  }

  /**
   * @inheritdoc
   * defaults:
   * - gas: 150000,
   * - gasPrice: '30000000000000'
   * // TODO: remove defaults
   * // TODO: ensure that the fromAddress is in the web3 memory
   */
  public deployContract(args: InterfaceContractDeployOptions): Promise<any> {
    if (args.data == undefined && args.contract.options.data == undefined) {
      throw new Error("[Vechain] Contract Data has not been provided");
    }
    if (
      args.fromAddress == undefined &&
      args.contract.options.from == undefined
    ) {
      throw new Error("[Vechain] From address has not been provided");
    }

    const data = args.contract.options.data
      ? args.contract.options.data
      : args.data;
    const arguments = args.args ? args.args : null;
    const fromAddress = args.contract.options.from
      ? args.contract.options.from
      : args.fromAddress;
    const gas = args.contract.options.gas ? args.contract.options.gas : 150000;

    return new Promise((resolve, reject) => {
      args.contract
        .deploy({
          data: data,
          arguments: arguments
        })
        .send({
          from: fromAddress,
          gas: gas
        })
        .then(newContractInstance => {
          return resolve(newContractInstance);
        })
        .catch(error => {
          return reject(
            new Error("[Vechain] Something went wrong when deploying the contract.")
          );
        });
      }
    }
  }

  /** @inheritdoc */
  public createAccount(): TypeAccount {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public privateKeyToAccount(key: Buffer): TypeAccount {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public subscribe(event: string): boolean {
    throw new Error("Method not implemented.");
  }

  /** @inheritdoc */
  public clearSubscriptions(): boolean {
    throw new Error("Method not implemented.");
  }
}

export default Vechain;
