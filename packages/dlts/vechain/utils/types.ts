export type MetaReceipt = {
  blockID: string;
  blockNumber: number;
  blockTimestamp: number;
  txID: string;
  txOrigin: string;
};

export type OutputReceipt = {
  contractAddress: string;
  events: Array<EventLogReceipt>;
  transfer: Array<TransferReceipt>;
};

export type EventLogReceipt = {
  address: string;
  topics: Array<string>;
  data: string;
};
export type TransferReceipt = {
  sender: string;
  recipient: string;
  amount: string;
};

export type Clause = {
  to: string;
  value: number;
  data: string;
};
