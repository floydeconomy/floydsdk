interface InterfaceTransactionReceipt {}
interface InterfaceVechainTransactionReceipt
  extends InterfaceTransactionReceipt {}
interface InterfaceBinanceTransactionReceipt
  extends InterfaceTransactionReceipt {}
interface InterfaceEthereumTransactionReceipt
  extends InterfaceTransactionReceipt {}

export {
  InterfaceTransactionReceipt,
  InterfaceEthereumTransactionReceipt,
  InterfaceVechainTransactionReceipt,
  InterfaceBinanceTransactionReceipt
};
