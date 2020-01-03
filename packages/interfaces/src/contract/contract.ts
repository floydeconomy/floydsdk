interface InterfaceContractOptions {
  jsonInterface: Array<Object>;
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

interface InterfaceContractDeployOptions {
  contract: any;
  data?: string;
  fromAddress?: string;
  args?: Array<any>;
}

export {
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt,
  InterfaceContractDeployOptions
};
