import Vechain from "../src/vechain.dlt";
import VechainProvider from "../src/vechain.provider";
import FloydSDK from "@floyd/core";
import {
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt,
  InterfaceContractDeployOptions,
  TypeDLT,
  TypeAccount
} from "@floyd/utils";
import { cry } from "thor-devkit";
import "jest-extended";
import {
  IVechainTransaction,
  IVechainTransactionOptions,
  IVechainTransactionReceipt,
  Clause
} from "../utils/interfaces";

import { alice } from "../utils/address";

// let intialiseTest = (dlt: string) => {
//   const dltOptions = {
//     name: dlt,
//     provider: {
//       uri: "http://localhost:4444"
//     }
//   };
//
//   let sdk: FloydSDK;
//   let vechain: Vechain;
//
//   beforeEach(() => {
//     const options = {
//       dlts: [dltOptions]
//     };
//     sdk = new FloydSDK(options);
//     vechain = new Vechain(sdk, dltOptions);
//   });
// };
const vechainTransactionReceipt = {
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
  status: true,
  transactionIndex: 0x123,
  logsBloom: "",
  from: "",
  to: "",
  logs: [],
  cumulativeGasUsed: 0x9
};

describe("transactions", () => {
  const vechainDLTOptions = {
    name: "vechain",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  let sdk: FloydSDK;
  let vechain: Vechain;
  beforeEach(() => {
    const options = {
      dlts: [vechainDLTOptions]
    };
    sdk = new FloydSDK(options);
    vechain = new Vechain(sdk, vechainDLTOptions);
  });

  describe("buildTransaction", () => {
    test("should build a vechain transaction", () => {
      const options: IVechainTransactionOptions = {
        nonce: 12345678,
        gasPrice: 128,
        gas: 21000,
        clauses: [
          {
            to: alice.address,
            value: 10,
            data: "0x"
          }
        ]
      };

      const transaction = vechain.buildTransaction(options);
      expect(transaction.nonce).toBe(12345678);
      expect(transaction.gasPriceCoef).toBe(128);
      expect(transaction.gas).toBe(21000);
      expect(transaction.clauses).toStrictEqual([
        {
          to: alice.address,
          value: 10,
          data: "0x"
        }
      ]);
    });
    test("all values should default if not provided", () => {
      const options: IVechainTransactionOptions = {
        nonce: 12345678,
        value: 21000,
        gasPrice: 128,
        gas: 21000
      };

      const transaction = vechain.buildTransaction(options);

      expect(transaction.chainTag).toBe(0x9a);
      expect(transaction.blockRef).toBe("0x0000000000000000");
      expect(transaction.expiration).toBe(18);
      expect(transaction.clauses).toStrictEqual([]);
      expect(transaction.gasPriceCoef).toBe(128);
      expect(transaction.gas).toBe(21000);
      expect(transaction.dependsOn).toBe(null);
      expect(transaction.nonce).toBe(12345678);
    });
    describe("nonce", () => {
      test("should fail if less than 0", () => {
        const options: IVechainTransactionOptions = {
          nonce: -1,
          value: 21000,
          gasPrice: 128,
          gas: 21000
        };
        expect(() => {
          vechain.buildTransaction(options);
        }).toThrowError(new Error("[Vechain] The nonce provided is invalid"));
      });
    });
    describe("gas", () => {
      test("should fail if less than or equal to 0", () => {
        expect(() => {
          const options: IVechainTransactionOptions = {
            nonce: 1,
            value: 21000,
            gasPrice: 128,
            gas: 0
          };
          vechain.buildTransaction(options);
        }).toThrowError(new Error("[Vechain] The gas provided is invalid"));

        expect(() => {
          const options: IVechainTransactionOptions = {
            nonce: 1,
            value: 21000,
            gasPrice: 128,
            gas: 1
          };
          vechain.buildTransaction(options);
        }).not.toThrowError(new Error("[Vechain] The gas provided is invalid"));
      });
    });
    describe("gasPriceCoef", () => {
      test("should fail if less than or equal to 0", () => {
        expect(() => {
          const options: IVechainTransactionOptions = {
            nonce: 1,
            value: 21000,
            gasPrice: 0,
            gas: 21000
          };
          vechain.buildTransaction(options);
        }).toThrowError(
          new Error("[Vechain] The gasPriceCoef provided is invalid")
        );

        expect(() => {
          const options: IVechainTransactionOptions = {
            nonce: 1,
            value: 21000,
            gasPrice: 1,
            gas: 21000
          };
          vechain.buildTransaction(options);
        }).not.toThrowError(
          new Error("[Vechain] The gasPriceCoef provided is invalid")
        );
      });
    });
  });

  //
  // describe("signTransaction", () => {
  //   let toAddress;
  //   let fromAddress;
  //   beforeEach(() => {
  //     toAddress = cry.publicKeyToAddress(
  //       cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
  //     );
  //     fromAddress = cry.secp256k1.generatePrivateKey();
  //   });
  //
  //   test("should sign the transaction", () => {
  //     const options: InterfaceVechainTransactionOptions = {
  //       nonce: 12345678,
  //       value: 21000,
  //       from: fromAddress.toString("hex"),
  //       gasPrice: 128,
  //       gas: 21000
  //     };
  //
  //     const transaction = vechain.buildTransaction(toAddress, "", options);
  //     const signature = vechain.signTransaction(transaction, fromAddress);
  //     expect(signature).toBeInstanceOf(Buffer);
  //   });
  //
  //   // test("should throw error if invalid private key format", () => {
  //   //   const options: InterfaceVechainTransactionOptions = {
  //   //     nonce: 12345678,
  //   //     amount: 21000,
  //   //     from: fromAddress.toString("hex"),
  //   //     gasPriceCoef: 128,
  //   //     gas: 21000
  //   //   };
  //   //   const privatekey = cry.keccak256(Buffer.alloc(0));
  //   //   const transaction = vechain.buildTransaction(toAddress, "", options);
  //   //   expect(() => {
  //   //     vechain.signTransaction(transaction, privatekey);
  //   //   }).toThrowError(new Error("[Vechain] Private key provided is invalid"));
  //   // });
  // });
  //
  // describe("sendSignedTransaction", () => {
  //   let signature;
  //   let transaction;
  //   beforeEach(() => {
  //     let fromAddress = Buffer.from(
  //       "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
  //       "hex"
  //     );
  //
  //     const options: InterfaceVechainTransactionOptions = {
  //       nonce: 12345678,
  //       value: 21000,
  //       from: fromAddress.toString("hex"),
  //       gasPrice: 128,
  //       gas: 21000
  //     };
  //
  //     transaction = vechain.buildTransaction(toAddress, "", options);
  //     signature = vechain.signTransaction(transaction, fromAddress);
  //     vechain = new Vechain(sdk, vechainDLTOptions);
  //   });
  //
  //   test("should fail if something goes wrong", async () => {
  //     const mockSendSignedTransaction = jest
  //       .fn(vechain.provider.instance.eth.sendSignedTransaction)
  //       .mockRejectedValue(new Error());
  //
  //     vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;
  //
  //     vechain.sendSignedTransaction(signature).catch(err => {
  //       expect(err).toStrictEqual(
  //         new Error(
  //           "[Vechain] Something went wrong when sending the signed transaction."
  //         )
  //       );
  //     });
  //   });
  //
  //   test("should return a transaction receipt", async () => {
  //     const mockSendSignedTransaction = jest
  //       .fn(vechain.provider.instance.eth.sendSignedTransaction)
  //       .mockResolvedValue(receipt1);
  //
  //     vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;
  //
  //     vechain.sendSignedTransaction(signature).then(receipt => {
  //       expect(receipt.status).toBe(true);
  //       expect(receipt.transactionHash).toBe(
  //         "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
  //       );
  //       expect(receipt.transactionIndex).toBe(0x123);
  //       expect(receipt.blockHash).toBe(
  //         "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
  //       );
  //       expect(receipt.blockNumber).toBe(2257);
  //       expect(receipt.cumulativeGasUsed).toBe(0x9);
  //       expect(receipt.gasUsed).toBe(66846);
  //       expect(receipt.from).toBe("");
  //       expect(receipt.to).toBe("");
  //     });
  //   });
  // });
  //
  // describe("sendTransaction", () => {
  //   let transaction;
  //   beforeEach(() => {
  //     transaction = {
  //       gasPrice: "20000000000",
  //       gas: "21000",
  //       to: "0x3535353535353535353535353535353535353535",
  //       value: "1000000000000000000",
  //       data: "",
  //       nonce: 0x0
  //     };
  //     vechain = new Vechain(sdk, vechainDLTOptions);
  //   });
  //
  //   test("should fail if something goes wrong", async () => {
  //     const mockSendSignedTransaction = jest
  //       .fn(vechain.provider.instance.eth.sendTransaction)
  //       .mockRejectedValue(new Error());
  //
  //     vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;
  //
  //     vechain.sendTransaction(transaction).catch(err => {
  //       expect(err).toStrictEqual(
  //         new Error(
  //           "[Vechain] Something went wrong when sending the transaction."
  //         )
  //       );
  //     });
  //   });
  //
  //   test("should return a transaction receipt", async () => {
  //     const mockSendSignedTransaction = jest
  //       .fn(vechain.provider.instance.eth.sendTransaction)
  //       .mockResolvedValue(receipt1);
  //
  //     vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;
  //
  //     vechain.sendTransaction(transaction).then(receipt => {
  //       expect(receipt.status).toBe(true);
  //       expect(receipt.transactionHash).toBe(
  //         "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
  //       );
  //       expect(receipt.transactionIndex).toBe(0x123);
  //       expect(receipt.blockHash).toBe(
  //         "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
  //       );
  //       expect(receipt.blockNumber).toBe(2257);
  //       expect(receipt.cumulativeGasUsed).toBe(0x9);
  //       expect(receipt.gasUsed).toBe(66846);
  //       expect(receipt.from).toBe("");
  //       expect(receipt.to).toBe("");
  //     });
  //   });
  // });
});
