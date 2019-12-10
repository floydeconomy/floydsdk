import { BN } from "ethereumjs-util";
import { Common } from "web3-core";

interface InterfaceTransaction {}

interface InterfaceEthereumTransaction extends InterfaceTransaction {
  to?: string;
  data: string;
  from?: string | number;
  value?: number | string | BN;
  gas?: number | string;
  gasPrice?: number | string | BN;
  nonce?: number | string;
  chainId?: number;
  common?: Common;
  chain?: string;
  hardfork?: string;
}

interface InterfaceVechainTransaction extends InterfaceTransaction {
  nonce: number;
  gas: number;
  gasPriceCoef: number;
  chainTag: number;
  blockRef: string;
  expiration: number;
  dependsOn: string;
  clauses: Array<VechainClause>;
}

type VechainClause = {
  to: string;
  value: number;
  data: string;
};

interface InterfaceBinanceTransaction extends InterfaceTransaction {}

export {
  InterfaceTransaction,
  InterfaceEthereumTransaction,
  InterfaceVechainTransaction,
  InterfaceBinanceTransaction
};
