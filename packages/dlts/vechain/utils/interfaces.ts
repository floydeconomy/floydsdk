import {
  InterfaceTransactionOptions,
  InterfaceTransactionReceipt,
  InterfaceTransaction
} from "@floyd/utils";

export interface IVechainTransactionOptions
  extends InterfaceTransactionOptions {
  blockRef?: string;
  expiration?: number;
  dependsOn?: string;
  chainTag?: number;
  clauses?: Array<Clause>;
}

export interface IVechainTransactionReceipt
  extends InterfaceTransactionReceipt {
  gasUsed: number;
  gasPayer?: string;
  paid?: string;
  reward?: string;
  reverted?: boolean;
  meta?: Object;
  outputs?: Array<Object>;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  status: boolean;
  transactionIndex: number;
  logsBloom?: string;
  from: string;
  to: string;
  logs?: [];
  cumulativeGasUsed?: number;
}

export interface IVechainTransaction extends InterfaceTransaction {
  nonce: number;
  gas: number;
  gasPriceCoef: number;
  chainTag: number;
  blockRef: string;
  expiration: number;
  dependsOn: string;
  clauses: Array<Clause>;
}

export type Clause = {
  to: string;
  value: number;
  data: string;
};
