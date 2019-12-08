<<<<<<< HEAD
import Contract from "web3-eth-contract";

=======
>>>>>>> master
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

<<<<<<< HEAD
interface InterfaceContractDeployOptions {
  contract: Contract.Contract;
  data?: string;
  fromAddress?: string;
  args?: Array<any>;
}

=======
>>>>>>> master
interface InterfaceContractReceipt {}

export {
  InterfaceContract,
  InterfaceContractOptions,
<<<<<<< HEAD
  InterfaceContractReceipt,
  InterfaceContractDeployOptions
=======
  InterfaceContractReceipt
>>>>>>> master
};
