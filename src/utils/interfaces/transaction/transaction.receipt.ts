interface InterfaceTransactionReceipt {}
interface InterfaceVechainTransactionReceipt
  extends InterfaceTransactionReceipt {}
interface InterfaceBinanceTransactionReceipt
  extends InterfaceTransactionReceipt {}


interface InterfaceEthereumTransactionReceipt extends InterfaceTransactionReceipt {
    status: boolean,
    transactionHash: string,
    transactionIndex: number,
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
