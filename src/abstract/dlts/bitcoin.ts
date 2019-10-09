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
  setAccount(privateKey: string): TypeAccount {
    const keyPair = bitcoin.ECPair.fromWIF(privateKey);
    const account = this._buildAccount(keyPair);
    return account;
  }

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

  /** @inheritdoc */
  createAccount(): TypeAccount {
    const keyPair = bitcoin.ECPair.makeRandom();
    const account = this._buildAccount(keyPair);
    return account;
  }
}

export default Bitcoin;
