interface InterfaceTransaction {
  to: string;
  data: string;
}

interface InterfaceEthereumTransaction extends InterfaceTransaction {
  gas: string;
  gasPrice: string;
  value: string;
  nonce: string;
}


interface InterfaceVechainTransaction extends InterfaceTransaction {
  nonce: number;
  gas: number;
  from: string;
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
