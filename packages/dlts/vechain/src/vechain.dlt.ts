import { AbstractDLT } from "@floyd/abstract";
import { HEX, PREFIX } from "@floyd/utils";
import { TypeDLT, TypeAccount } from "@floyd/types";
import { IContractOptions, IContractDeployOptions } from "@floyd/interfaces";
import { cry, Transaction } from "thor-devkit";
import {
  IVechainTransactionOptions,
  IVechainTransaction,
  IVechainTransactionReceipt
} from "../utils/interfaces";
import { transactionReceiptFormatter } from "../utils/formatters";

/** @inheritdoc */
class Vechain extends AbstractDLT {
  /** @inheritdoc */
  name: string = "Vechain";

  /** @inheritdoc */
  symbol: string = "VET";

  /** @inheritdoc */
  constructor(options: TypeDLT) {
    super(options);
  }

  /** @inheritdoc */
  public buildTransaction(
    options: IVechainTransactionOptions
  ): IVechainTransaction {
    if (options.nonce && options.nonce < 0) {
      throw new Error("[Vechain] The nonce provided is invalid");
    }
    if (options.gas <= 0) {
      throw new Error("[Vechain] The gas provided is invalid");
    }
    if (options.gasPrice <= 0) {
      throw new Error("[Vechain] The gasPriceCoef provided is invalid");
    }

    // TODO: chainTag should also check provider
    // TODO: calculate estimatedGas
    const transaction: IVechainTransaction = {
      chainTag: options.chainTag ? options.chainTag : 0x9a,
      blockRef: options.blockRef ? options.blockRef : "0x0000000000000000",
      expiration: options.expiration ? options.expiration : 18,
      clauses: options.clauses ? options.clauses : [],
      gasPriceCoef: options.gasPrice ? options.gasPrice : 128,
      gas: options.gas ? options.gas : 21000,
      dependsOn: options.dependsOn ? options.dependsOn : null,
      nonce: options.nonce ? options.nonce : 0
    };

    return transaction;
  }

  /** @inheritdoc */
  public sendSignedTransaction(
    signature: string
  ): Promise<IVechainTransactionReceipt> {
    return new Promise((resolve, reject) => {
      // ensure signature starts with 0x
      if (!signature.startsWith(PREFIX, 0)) {
        return reject(
          new Error(
            "[Vechain] The signature provided must be prefixed with " + PREFIX
          )
        );
      }

      this.provider.instance.eth
        .sendSignedTransaction(signature)
        .then(receipt => {
          return resolve(transactionReceiptFormatter(receipt));
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * @inheritdoc
   * // TODO: ensure that private is included in web3.wallet
   */
  public sendTransaction(
    transaction: IVechainTransaction
  ): Promise<IVechainTransactionReceipt> {
    return new Promise((resolve, reject) => {
      this.provider.instance.eth
        .sendTransaction(transaction)
        .then(receipt => {
          return resolve(transactionReceiptFormatter(receipt));
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /** @inheritdoc */
  public signTransaction(
    transaction: IVechainTransaction,
    pk: string | Buffer
  ): string {
    var originPriv: Buffer;
    if (typeof pk === "string") {
      originPriv = Buffer.from(pk, HEX);
    }
    if (pk instanceof Buffer) {
      originPriv = pk;
    }
    let body: Transaction.Body = transaction;
    let tx = new Transaction(body);
    let signingHash = cry.blake2b256(tx.encode());
    tx.signature = cry.secp256k1.sign(signingHash, originPriv);
    return PREFIX + tx.encode().toString(HEX);
  }

  /**
   * @inheritdoc
   * // TODO: should use its own Interface called InterfaceVechainContractOptions
   * // TODO: should return its own Interface or Class and not Web3.eth.Contract
   * @param {InterfaceContractOptions} options
   * @return {Web3.eth.Contract}
   */
  public createContract(options: IContractOptions): any {
    // if (options.jsonInterface.length < 1) {
    //   throw new Error("[Vechain] The ABI provided is invalid");
    // }
    // try {
    //   const contract = new this.provider.instance.eth.Contract(
    //     options.jsonInterface,
    //     options.address,
    //     options.options
    //   );
    //   return contract;
    // } catch {
    //   throw new Error("[Vechain] Something went wrong with contract creation");
    // }
  }

  /**
   * @inheritdoc
   * defaults:
   * - gas: 150000,
   * - gasPrice: '30000000000000'
   * // TODO: remove defaults
   * // TODO: ensure that the fromAddress is in the web3 memory
   */
  public deployContract(args: IContractDeployOptions): Promise<any> {
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
    const argument = args.args ? args.args : null;
    const fromAddress = args.contract.options.from
      ? args.contract.options.from
      : args.fromAddress;
    const gas = args.contract.options.gas ? args.contract.options.gas : 150000;

    return new Promise((resolve, reject) => {
      args.contract
        .deploy({
          data: data,
          arguments: argument
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
            new Error(
              "[Vechain] Something went wrong when deploying the contract."
            )
          );
        });
    });
  }

  /** @inheritdoc */
  public createAccount(): TypeAccount {
    const privKey = cry.secp256k1.generatePrivateKey();
    return this._generateAccountFromPrivateKey(privKey);
  }

  /** @inheritdoc */
  public privateKeyToAccount(pk: string): TypeAccount {
    const pkBuffer = Buffer.from(pk, HEX);
    return this._generateAccountFromPrivateKey(pkBuffer);
  }

  /**
   * Generate an account based on pk provided
   * @param {Buffer} pk
   * @return {TypeAccount}
   */
  private _generateAccountFromPrivateKey(pk: Buffer): TypeAccount {
    const pubKey = cry.secp256k1.derivePublicKey(pk);
    const addr = cry.publicKeyToAddress(pubKey);
    return {
      privateKey: pk.toString(HEX),
      address: PREFIX + addr.toString(HEX)
    };
  }

  /**
   * @inheritdoc
   * // TODO: params account must use address that starts w0x
   * // TODO: add the account into web3.accounts as well
   */
  public addAccount(account?: TypeAccount): TypeAccount {
    if (
      account &&
      (account.privateKey.length == 0 || account.address.length == 0)
    ) {
      throw new Error("[Vechain] The account provided is invalid");
    }
    const newAccount: TypeAccount = account ? account : this.createAccount();
    this.accounts.push(newAccount);
    return newAccount;
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
