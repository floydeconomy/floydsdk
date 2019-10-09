import AbstractDLT from "./dlt";
import { TypeAccount } from '../../types/sdk';
import * as bitcoin from 'bitcoinjs-lib';

class Bitcoin extends AbstractDLT {
  /** Name of the DLT */
  name: string = 'bitcoin';

  /** Symbol used by the DLT */
  symbol: string = 'XBT'
  
  /**
   * @inheritdoc
   */
  constructor(options: Object = {}) {
    super(options);
  }

  /** @inheritdoc */
  addAccount(privateKey?: string): TypeAccount {
    try {
      var keyPair;
      if (privateKey != null) {
        keyPair = bitcoin.ECPair.fromWIF(privateKey);
      } else {
        keyPair = bitcoin.ECPair.makeRandom();
      }
      return this._buildAccount(keyPair);
    } catch {
      throw new Error("Private key provided is invalid");
    }
  }

  /** This is a common method used by setAccount and createAccount */
  private _buildAccount(keyPair: any): TypeAccount {
    const privateKey = keyPair.toWIF();
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    this.accounts.push({
      privateKey,
      address
    });
    return {
      privateKey,
      address
    }
  }
}

export default Bitcoin;
