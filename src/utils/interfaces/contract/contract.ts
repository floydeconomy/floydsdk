import Contract from "web3-eth-contract";

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

interface InterfaceContractDeployOptions {
  contract: Contract.Contract;
  data?: string;
  fromAddress?: string;
  args?: Array<any>;
}

interface InterfaceContractReceipt {}

export {
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt,
  InterfaceContractDeployOptions
};
