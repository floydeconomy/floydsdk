interface ITransactionReceipt {}

interface IBinanceTransactionReceipt extends ITransactionReceipt {}

interface IEthereumTransactionReceipt extends ITransactionReceipt {
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
  ITransactionReceipt,
  IEthereumTransactionReceipt,
  IBinanceTransactionReceipt
};
