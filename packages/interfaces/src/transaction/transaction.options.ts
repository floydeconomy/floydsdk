interface ITransactionOptions {
  nonce?: number;
  value?: number;
  gasPrice?: number;
  gas?: number;
}

interface IEthereumTransactionOptions extends ITransactionOptions {
  from: string;
  to?: string;
  data?: string;
}

interface IBinanceTransactionOptions extends ITransactionOptions {}

export {
  ITransactionOptions,
  IEthereumTransactionOptions,
  IBinanceTransactionOptions
};
