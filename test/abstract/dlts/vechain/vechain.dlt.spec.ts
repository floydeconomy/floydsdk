import FloydSDK from "../../../../src/core/index";
import Vechain from "../../../../src/abstract/dlts/vechain/vechain.dlt";
import { TypeDLT } from "../../../../src/utils/types/index";
import VechainProvider from "../../../../src/abstract/dlts/vechain/vechain.provider";
import { cry } from "thor-devkit";
import "jest-extended";
import {
  InterfaceVechainTransactionOptions,
  InterfaceVechainTransaction,
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt
} from "../../../../src/utils/interfaces";

describe("vechain", () => {
  const vechainDLTOptions = {
    name: "vechain",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  const notVechainDLTOptions = {
    name: "notvechain",
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

  describe("dlt", () => {
    it("should instantiate vechain as abstracdlt", () => {
      expect(sdk.dlts.vechain).toBeInstanceOf(Vechain);
    });
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = notVechainDLTOptions;
      try {
        new Vechain(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The Provider for this DLT is not present, please add the provider for notvechain manually."
          )
        );
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = vechainDLTOptions;
      const vechain = new Vechain(sdk, dltOptions);
      expect(vechain.provider).toBeInstanceOf(VechainProvider);
    });
  });

  describe("transactions", () => {
    let toAddress;
    let fromAddress;
    const receipt1 = {
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
        txID:
          "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490",
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
    beforeEach(() => {
      toAddress = cry.publicKeyToAddress(
        cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
      );
      fromAddress = cry.publicKeyToAddress(
        cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
      );
    });
    describe("buildTransaction", () => {
      test("should build a vechain transaction", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: 12345678,
          value: 21000,
          from: fromAddress.toString("hex"),
          gasPrice: 128,
          gas: 21000
        };

        const transaction = vechain.buildTransaction(toAddress, "", options);

        expect(transaction.nonce).toBe(12345678);
        expect(transaction.value).toBe(21000);
        expect(transaction.from).toBe(fromAddress.toString("hex"));
        expect(transaction.to).toBe(toAddress);
        expect(transaction.gasPriceCoef).toBe(128);
        expect(transaction.gas).toBe(21000);
        expect(transaction.dependsOn).toBe(null);
        expect(transaction.expiration).toBe(32);
        expect(transaction.blockRef).toBe("0x0000000000000000");
        expect(transaction.chainTag).toBe(0x9a);
      });
      describe("nonce", () => {
        test("should fail if less than 0", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: -1,
            value: 21000,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };
          expect(() => {
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The nonce provided is invalid"));
        });
        test("should default to null if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            value: 21000,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.nonce).toBe(0);
        });
      });
      describe("value", () => {
        test("should fail if less than 0", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            value: -1,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };

          expect(() => {
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Vechain] The amount provided is invalid")
          );
        });
      });
      describe("gas", () => {
        test("should fail if less than or equal to 0", () => {
          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: 128,
              gas: 0
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The gas provided is invalid"));

          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: 128,
              gas: -1
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The gas provided is invalid"));
        });

        test("should default to 21000 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gasPrice: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.gas).toBe(21000);
        });
      });
      describe("gasPriceCoef", () => {
        test("should fail if less than or equal to 0", () => {
          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: -1,
              gas: 21000
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Vechain] The gasPriceCoef provided is invalid")
          );

          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: 0,
              gas: 21000
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Vechain] The gasPriceCoef provided is invalid")
          );
        });

        test("should default to 128 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gas: 11111
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.gasPriceCoef).toBe(128);
        });
      });

      describe("chainTag", () => {
        test("should default to 0x9a if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPrice: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.chainTag).toBe(0x9a);
        });
      });

      describe("blockRef", () => {
        test("should default to 0x0000000000000000 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPrice: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.blockRef).toBe("0x0000000000000000");
        });
      });

      describe("expiration", () => {
        test("should default to 32 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPrice: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.expiration).toBe(32);
        });
      });
    });

    describe("signTransaction", () => {
      let toAddress;
      let fromAddress;
      beforeEach(() => {
        toAddress = cry.publicKeyToAddress(
          cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
        );
        fromAddress = cry.secp256k1.generatePrivateKey();
      });

      test("should sign the transaction", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: 12345678,
          value: 21000,
          from: fromAddress.toString("hex"),
          gasPrice: 128,
          gas: 21000
        };

        const transaction = vechain.buildTransaction(toAddress, "", options);
        const signature = vechain.signTransaction(transaction, fromAddress);
        expect(signature).toBeInstanceOf(Buffer);
      });

      // test("should throw error if invalid private key format", () => {
      //   const options: InterfaceVechainTransactionOptions = {
      //     nonce: 12345678,
      //     amount: 21000,
      //     from: fromAddress.toString("hex"),
      //     gasPriceCoef: 128,
      //     gas: 21000
      //   };
      //   const privatekey = cry.keccak256(Buffer.alloc(0));
      //   const transaction = vechain.buildTransaction(toAddress, "", options);
      //   expect(() => {
      //     vechain.signTransaction(transaction, privatekey);
      //   }).toThrowError(new Error("[Vechain] Private key provided is invalid"));
      // });
    });

    describe("sendSignedTransaction", () => {
      let signature;
      let transaction;
      beforeEach(() => {
        let fromAddress = new Buffer(
          "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
          "hex"
        );

        const options: InterfaceVechainTransactionOptions = {
          nonce: 12345678,
          value: 21000,
          from: fromAddress.toString("hex"),
          gasPrice: 128,
          gas: 21000
        };

        transaction = vechain.buildTransaction(toAddress, "", options);
        signature = vechain.signTransaction(transaction, fromAddress);
        vechain = new Vechain(sdk, vechainDLTOptions);
      });

      test("should fail if something goes wrong", async () => {
        const mockSendSignedTransaction = jest
          .fn(vechain.provider.instance.eth.sendSignedTransaction)
          .mockRejectedValue(new Error());

        vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

        vechain.sendSignedTransaction(signature).catch(err => {
          expect(err).toStrictEqual(
            new Error(
              "[Vechain] Something went wrong when sending the signed transaction."
            )
          );
        });
      });

      test("should return a transaction receipt", async () => {
        const mockSendSignedTransaction = jest
          .fn(vechain.provider.instance.eth.sendSignedTransaction)
          .mockResolvedValue(receipt1);

        vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

        vechain.sendSignedTransaction(signature).then(receipt => {
          expect(receipt.status).toBe(true);
          expect(receipt.transactionHash).toBe(
            "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
          );
          expect(receipt.transactionIndex).toBe(0x123);
          expect(receipt.blockHash).toBe(
            "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
          );
          expect(receipt.blockNumber).toBe(2257);
          expect(receipt.cumulativeGasUsed).toBe(0x9);
          expect(receipt.gasUsed).toBe(66846);
          expect(receipt.from).toBe("");
          expect(receipt.to).toBe("");
        });
      });
    });

    describe("sendTransaction", () => {
      let transaction;
      beforeEach(() => {
        transaction = {
          gasPrice: "20000000000",
          gas: "21000",
          to: "0x3535353535353535353535353535353535353535",
          value: "1000000000000000000",
          data: "",
          nonce: 0x0
        };
        vechain = new Vechain(sdk, vechainDLTOptions);
      });

      test("should fail if something goes wrong", async () => {
        const mockSendSignedTransaction = jest
          .fn(vechain.provider.instance.eth.sendTransaction)
          .mockRejectedValue(new Error());

        vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;

        vechain.sendTransaction(transaction).catch(err => {
          expect(err).toStrictEqual(
            new Error(
              "[Vechain] Something went wrong when sending the transaction."
            )
          );
        });
      });

      test("should return a transaction receipt", async () => {
        const mockSendSignedTransaction = jest
          .fn(vechain.provider.instance.eth.sendTransaction)
          .mockResolvedValue(receipt1);

        vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;

        vechain.sendTransaction(transaction).then(receipt => {
          expect(receipt.status).toBe(true);
          expect(receipt.transactionHash).toBe(
            "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
          );
          expect(receipt.transactionIndex).toBe(0x123);
          expect(receipt.blockHash).toBe(
            "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
          );
          expect(receipt.blockNumber).toBe(2257);
          expect(receipt.cumulativeGasUsed).toBe(0x9);
          expect(receipt.gasUsed).toBe(66846);
          expect(receipt.from).toBe("");
          expect(receipt.to).toBe("");
        });
      });
    });
  });

  describe("contracts", () => {
    vechain = new Vechain(sdk, vechainDLTOptions);

    describe("createContract", () => {
      const abi = [
        {
          type: "constructor",
          payable: false,
          stateMutability: "nonpayable",
          inputs: [{ name: "testInt", type: "uint256" }]
        },
        {
          type: "function",
          name: "foo",
          constant: false,
          payable: false,
          stateMutability: "nonpayable",
          inputs: [
            { name: "b", type: "uint256" },
            { name: "c", type: "bytes32" }
          ],
          outputs: [{ name: "", type: "address" }]
        },
        {
          type: "event",
          name: "Event",
          inputs: [
            { indexed: true, name: "b", type: "uint256" },
            { indexed: false, name: "c", type: "bytes32" }
          ],
          anonymous: false
        },
        {
          type: "event",
          name: "Event2",
          inputs: [
            { indexed: true, name: "b", type: "uint256" },
            { indexed: false, name: "c", type: "bytes32" }
          ],
          anonymous: false
        }
      ];
      const addr = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
      const fromAddress = "0x1234567890123456789012345678901234567891";
      const gasPrice = "20000000000";
      const contractOptions: InterfaceContractOptions = {
        jsonInterface: abi,
        address: addr,
        options: {
          from: fromAddress,
          gasPrice: gasPrice
        }
      };

      describe("should create contract instance", () => {
        let contract = vechain.createContract(contractOptions);
        expect(contract.options.address).toBe(addr);
        expect(contract.options.jsonInterface).toEqual(abi);
        expect(contract.options.from).toBe(fromAddress);
        expect(contract.options.gasPrice).toBe(gasPrice);
        expect(contract.options.gas).toBe(undefined);
      });

      describe("should throw error if something goes wrong", () => {
        // expect(() => {
        //   // vechain.createContract();
        // }).toThrowError(
        //   new Error("[Vechain] The contract creation has failed")
        // );
      });
    });
  });
});
