import { BN } from "ethereumjs-util";
import { Common } from "web3-core";

interface ITransaction {}

interface IEthereumTransaction extends ITransaction {
  to?: string;
  data: string;
  from?: string | number;
  value?: number | string | BN;
  gas?: number | string;
  gasPrice?: number | string | BN;
  nonce?: number | string;
  chainId?: number;
  common?: Common;
  chain?: string;
  hardfork?: string;
}

interface IBinanceTransaction extends ITransaction {}

export { ITransaction, IEthereumTransaction, IBinanceTransaction };
