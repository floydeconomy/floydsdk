import AbstractDLT from "./dlt";
import { TypeAccount, TypeProvider } from "../../types/sdk";

import * as bitcoin from "bitcoinjs-lib";
import client from "bitcoin-cli";

class Bitcoin extends AbstractDLT {
  /** @inheritdoc */
  name: string = "bitcoin";
  
  /** @inheritdoc */
  symbol: string = "btc";

  /** @inheritdoc */
  constructor(sdk: any, options: Object = {}) {
    super(sdk, options);
  }

  /** @inheritdoc */
  createProvider(options: TypeProvider): void {
    
  }

  /**  @inheritdoc */
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
