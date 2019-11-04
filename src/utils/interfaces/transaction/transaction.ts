interface InterfaceTransaction {
  nonce: number;
  to: string;
  data: string;
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
  chainTag: number;
  blockRef: string;
  expiration: number;
  dependsOn: string;
  value: number;
  clauses: []
}

interface InterfaceBinanceTransaction extends InterfaceTransaction {}

export {
  InterfaceTransaction,
  InterfaceEthereumTransaction,
  InterfaceVechainTransaction,
  InterfaceBinanceTransaction
};
