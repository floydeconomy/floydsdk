interface InterfaceTransactionOptions {
  nonce?: number;
  from: string;
  value?: number;
  gasPrice?: number;
  gas?: number;
  to?: string;
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
  }

interface InterfaceVechainTransactionOptions
  extends InterfaceTransactionOptions {

}

interface InterfaceBinanceTransactionOptions
  extends InterfaceTransactionOptions {}

export {
  InterfaceTransactionOptions,
  InterfaceEthereumTransactionOptions,
  InterfaceVechainTransactionOptions,
  InterfaceBinanceTransactionOptions
};
