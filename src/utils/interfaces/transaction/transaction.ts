import { BN } from 'ethereumjs-util';
import { Common } from 'web3-core';

interface InterfaceTransaction {
  to?: string;
  data: string;
}

interface InterfaceEthereumTransaction extends InterfaceTransaction {
  from?: string | number;
  value?: number | string | BN;
  gas?: number | string;
  gasPrice?: number | string | BN;
  nonce?: number;
  chainId?: number;
  common?: Common;
  chain?: string;
  hardfork?: string;
}




interface InterfaceVechainTransaction extends InterfaceTransaction {
  nonce: number;
  gas: number;
  from: string;
  gasPriceCoef: number;
  chainTag: number;
  blockRef: string;
  expiration: number;
  dependsOn: string;
  value: number;
  clauses: []
}

interface InterfaceBinanceTransaction extends InterfaceTransaction {}

export {
  InterfaceTransaction,
  InterfaceEthereumTransaction,
  InterfaceVechainTransaction,
  InterfaceBinanceTransaction
};
