interface InterfaceTransactionReceipt {}

interface InterfaceBinanceTransactionReceipt
  extends InterfaceTransactionReceipt {}

interface InterfaceVechainTransactionReceipt
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

interface InterfaceEthereumTransactionReceipt
  extends InterfaceTransactionReceipt {
  status: boolean;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  contractAddress?: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs: Array<Object>;
  from: string;
  to: string;
  logsBloom: string;
}

export {
  InterfaceTransactionReceipt,
  InterfaceEthereumTransactionReceipt,
  InterfaceVechainTransactionReceipt,
  InterfaceBinanceTransactionReceipt
};
