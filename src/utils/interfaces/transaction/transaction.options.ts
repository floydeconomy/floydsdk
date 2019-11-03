interface InterfaceTransactionOptions {
  nonce?: number;
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
  gasPrice: string;
  gas: string;
  amount: string;
}

interface InterfaceVechainTransactionOptions
  extends InterfaceTransactionOptions {
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
