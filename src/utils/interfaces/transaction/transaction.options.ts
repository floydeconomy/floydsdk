import { BN } from 'ethereumjs-util';

interface InterfaceTransactionOptions {
}

interface InterfaceEthereumTransactionOptions
  extends InterfaceTransactionOptions {
    nonce?: number;
    gasPrice?: number | string | BN;
    gas?: number | string;
    value?: number | string | BN;
    from?: string | number;
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
