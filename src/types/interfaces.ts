interface InterfaceTransactionOptions {
  nonce?: number;
}

interface InterfaceTransaction {
  nonce: number;
  to: string;
  data: string;
}

interface InterfaceTransactionReceipt {

}

interface InterfaceEthereumTransactionOptions extends InterfaceTransactionOptions {
  gasPrice: string;
  gas: string;
  amount: string;
}

interface InterfaceEthereumTransaction extends InterfaceTransaction {
  gas: string;
  gasPrice: string;
  value: string;
}

interface InterfaceVechainTransaction extends InterfaceTransaction {
  from: string;
  gas: number;
  gasPriceCoef: number;
  chainTag?: number;
  blockRef?: string;
  expiration?: number;
  dependsOn?: string;
  value: number;
}

interface InterfaceVechainTransactionOptions extends InterfaceTransactionOptions {
  from: string;
  gasPriceCoef?: number;
  gas?: number;
  amount: number;
}

interface InterfaceBinanceTransaction extends InterfaceTransaction {

}

interface InterfaceBinanceTransactionOptions extends InterfaceTransactionOptions {}

export {
  InterfaceTransaction,
  InterfaceTransactionOptions,
  InterfaceEthereumTransaction,
  InterfaceEthereumTransactionOptions,
  InterfaceVechainTransaction,
  InterfaceVechainTransactionOptions,
  InterfaceBinanceTransaction,
  InterfaceBinanceTransactionOptions
};
