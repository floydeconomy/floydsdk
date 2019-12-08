interface InterfaceContractOptions {
  jsonInterface: Array;
  address?: string;
  options?: Object;
}

interface InterfaceContract {
  address: string;
  jsonInterface: [];
  from: string;
  gasPrice: string;
  gas: number;
}

interface InterfaceContractReceipt {}

export {
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt
};
