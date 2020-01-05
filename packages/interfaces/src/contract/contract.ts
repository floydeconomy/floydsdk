interface IContractOptions {
  jsonInterface: Array<Object>;
  address?: string;
  options?: Object;
}
interface IContract {
  address: string;
  jsonInterface: [];
  from: string;
  gasPrice: string;
  gas: number;
}
interface IContractReceipt {}
interface IContractDeployOptions {
  contract: any;
  data?: string;
  fromAddress?: string;
  args?: Array<any>;
}

export {
  IContract,
  IContractOptions,
  IContractReceipt,
  IContractDeployOptions
};
