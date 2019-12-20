interface InterfaceTransactionOptions {
  nonce?: number;
  value?: number;
  gasPrice?: number;
  gas?: number;
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
  from: string;
  to?: string;
  data?: string;
}

interface InterfaceBinanceTransactionOptions
  extends InterfaceTransactionOptions {}

export {
  InterfaceTransactionOptions,
  InterfaceEthereumTransactionOptions,
  InterfaceBinanceTransactionOptions
};
