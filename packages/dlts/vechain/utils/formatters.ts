import { IVechainTransactionReceipt } from "./interfaces";
export const transactionReceiptFormatter = function(
  receipt: any
): IVechainTransactionReceipt {
  return {
    gasUsed: receipt.gasUsed,
    gasPayer: receipt.gasPayer,
    paid: receipt.paid,
    reward: receipt.reward,
    reverted: receipt.reverted,
    meta: receipt.meta,
    outputs: receipt.outputs,
    blockNumber: receipt.blockNumber,
    blockHash: receipt.blockHash,
    transactionHash: receipt.transactionHash,
    status: receipt.status
  };
};
