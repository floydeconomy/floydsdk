interface InterfaceTransactionOptions {
  nonce?: number;
  amount: string;
}

interface InterfaceEthereumTransactionOptions extends InterfaceTransactionOptions {
  feePrice: string;
  feeLimit: string;
  amount: string;
}

interface InterfaceTransaction {
  nonce: number;
  to: string;
  value: string;
  data: string;
}

interface InterfaceEthereumTransaction extends InterfaceTransaction {
  gas: string;
  gasPrice: string;
}

interface InterfaceVechainTransaction extends InterfaceTransaction {}

interface InterfaceVechainTransactionOptions extends InterfaceTransactionOptions {}

interface InterfaceBinanceTransaction extends InterfaceTransaction {}

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
