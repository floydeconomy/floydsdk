import AbstractDLT from "./dlt";
import { TypeAccount } from "../../types/sdk";
import * as bitcoin from "bitcoinjs-lib";

class Bitcoin extends AbstractDLT {
  /** Name of the DLT */
  name: string = "bitcoin";

  /** Symbol used by the DLT */
  symbol: string = "btc";

  /**
   * @inheritdoc
   */
  constructor(options: Object = {}) {
    super(options);
  }

  /** 
   * @inheritdoc
   */
  addAccount(privateKey?: string): TypeAccount {
    try {
      var keyPair;
      if (privateKey != null) {
        keyPair = bitcoin.ECPair.fromWIF(privateKey);
      } else {
        keyPair = bitcoin.ECPair.makeRandom();
        privateKey = keyPair.toWIF();
      }
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      const account: TypeAccount = { 
        privateKey, 
        address 
      };
      this.accounts.push(account);
      return account;
    } catch {
      throw new Error("[Account] Issue while creating the key pair.");
    }
  }
}

export default Bitcoin;
