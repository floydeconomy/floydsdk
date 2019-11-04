interface InterfaceTransactionOptions {
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
  nonce: string;
  gasPrice: string;
  gas: string;
  amount: string;
  from: string;
}

interface InterfaceVechainTransactionOptions
  extends InterfaceTransactionOptions {
  nonce?: number;
  from: string;
  gasPriceCoef?: number;
  gas?: number;
  amount: number;
}

interface InterfaceBinanceTransactionOptions
  extends InterfaceTransactionOptions {}

export {
  InterfaceTransactionOptions,
  InterfaceEthereumTransactionOptions,
  InterfaceVechainTransactionOptions,
  InterfaceBinanceTransactionOptions
};
