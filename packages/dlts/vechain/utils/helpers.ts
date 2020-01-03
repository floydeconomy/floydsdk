import { TypeAccount } from "@floyd/types";
import { IVechainTransaction } from "./interfaces";

// Transaction Helpers
export const MOCKRECEIPT = {
  gasUsed: 66846,
  gasPayer: "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e",
  paid: "0x39facb2d5afc30000",
  reward: "0x1164d68d9b4ba8000",
  reverted: false,
  meta: {
    blockID:
      "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86",
    blockNumber: 2257,
    blockTimestamp: 1528451320,
    txID: "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490",
    txOrigin: "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e"
  },
  outputs: [
    {
      contractAddress: null,
      events: [
        {
          address: "0x0000000000000000000000000000456E65726779",
          topics: [Array],
          data:
            "0x00000000000000000000000000000000000000000000010f0cf064dd59200000"
        }
      ],
      transfers: []
    },
    {
      contractAddress: null,
      events: [],
      transfers: [
        {
          sender: "0x4f6fc409e152d33843cf4982d414c1dd0879277e",
          recipient: "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
          amount: "0x10f0cf064dd59200000"
        }
      ]
    }
  ],
  blockNumber: 2257,
  blockHash:
    "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86",
  transactionHash:
    "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490",
  status: "0x1"
};
export const MOCKSIGNATURE =
  "0xf86b819a8012d8d7947f4ab4b4b6a5c270c62997835baba027dde1ccb00a8081808252088083bc614ec0b841f688310efb2f7e3bc9e7967d127fab4b36906e8fafbbcc766704022819b6970d5df5f9393e2685f46fbacf04a6f923eaf05fe98ae47a27f8f4da008e660370ce01";
export const MOCKTRANSACTION: IVechainTransaction = {
  nonce: 12345678,
  gasPriceCoef: 128,
  gas: 21000,
  clauses: [],
  chainTag: 0x9a,
  blockRef: "0x0000000000000000",
  expiration: 18,
  dependsOn: null
};

// Vechain accounts Helpers
export const ALICE: TypeAccount = {
  privateKey:
    "38860424dada37e66026d5a3e1af5f2a45e2b7cdb3641bc4ba6b3881cd11caca",
  address: "0x7f4ab4b4b6a5c270c62997835baba027dde1ccb0"
};
export const BOB: TypeAccount = {
  privateKey:
    "93020424dada37e66026d5a3e1af5f2a45e2b7cdb3641bc4ba6b3881cd11caca",
  address: "0xkj3Ab4b4b6a5c270c62997835baba027dde1ccb0"
};
