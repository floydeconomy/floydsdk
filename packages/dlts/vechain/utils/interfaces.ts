import {
  ITransactionOptions,
  ITransactionReceipt,
  ITransaction
} from "@floyd/interfaces";

import { Clause, MetaReceipt, OutputReceipt } from "./types";

interface IVechainTransactionOptions extends ITransactionOptions {
  blockRef?: string;
  expiration?: number;
  dependsOn?: string;
  chainTag?: number;
  clauses?: Array<Clause>;
}

interface IVechainTransactionReceipt extends ITransactionReceipt {
  gasUsed: number;
  gasPayer: string;
  paid: string;
  reward: string;
  reverted: boolean;
  meta: MetaReceipt;
  outputs: Array<OutputReceipt>;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  status: string;
}

interface IVechainTransaction extends ITransaction {
  nonce: number;
  gas: number;
  gasPriceCoef: number;
  chainTag: number;
  blockRef: string;
  expiration: number;
  dependsOn: string;
  clauses: Array<Clause>;
}

export {
  IVechainTransaction,
  IVechainTransactionOptions,
  IVechainTransactionReceipt
};
