import FloydSDK from "@floyd/core";
import Ethereum from "../src/ethereum.dlt";
import {
  InterfaceEthereumTransaction,
  InterfaceEthereumTransactionOptions,
  InterfaceEthereumTransactionReceipt,
  TypeDLT
} from "@floyd/utils";
import { AbstractProvider } from "@floyd/abstract";
import "jest-extended";

describe("ethereum", () => {
  const ethereumDLTOptions = {
    name: "ethereum",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  const notethereumDLTOptions = {
    name: "notethereum",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  var sdk;
  var ethereum: Ethereum;
  beforeEach(() => {
    const options = {
      dlts: [ethereumDLTOptions]
    };
    sdk = new FloydSDK(options);
    ethereum = new Ethereum(sdk, ethereumDLTOptions);
  });

  describe("dlt", () => {
    it("should instantiate ethereum as abstracdlt", () => {
      expect(sdk.dlts.ethereum).toBeInstanceOf(Ethereum);
    });
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = notethereumDLTOptions;
      try {
        new Ethereum(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The Provider for this DLT is not present, please add the provider for notethereum manually."
          )
        );
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = ethereumDLTOptions;
      const ethereum = new Ethereum(sdk, dltOptions);
      expect(ethereum.provider).toBeInstanceOf(AbstractProvider);
    });
  });

  describe("transactions", () => {
    let toAddress;
    let fromAddress;
    beforeEach(() => {
      toAddress = ethereum.provider.instance.eth.accounts.create().address;
      fromAddress = ethereum.provider.instance.eth.accounts.create().address;
    });

    describe("buildTransaction", () => {
      test("should build a transaction", () => {
        const options: InterfaceEthereumTransactionOptions = {
          nonce: 0,
          gasPrice: 0x09184e72a000,
          gas: 0x2710,
          value: 0,
          from: fromAddress
        };
        const transaction = ethereum.buildTransaction(toAddress, "", options);
        expect(transaction.nonce).toBe(0);
        expect(transaction.value).toBe(0);
        expect(transaction.to).toBe(toAddress);
        expect(transaction.gas).toBe(0x2710);
        expect(transaction.gasPrice).toBe(0x09184e72a000);
      });

      describe("nonce", () => {
        test("should fail if less than 0", () => {
          const options: InterfaceEthereumTransactionOptions = {
            nonce: -1,
            value: 21000,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };
          expect(() => {
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Ethereum] The nonce provided is invalid")
          );
        });
        test("should default to null if not provided", () => {
          const options: InterfaceEthereumTransactionOptions = {
            value: 21000,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };
          const transaction = ethereum.buildTransaction(toAddress, "", options);
          expect(transaction.nonce).toBe(0);
        });
      });
      describe("value", () => {
        test("should fail if less than 0", () => {
          const options: InterfaceEthereumTransactionOptions = {
            nonce: 123,
            value: -1,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 21000
          };

          expect(() => {
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Ethereum] The amount provided is invalid")
          );
        });
      });
      describe("gas", () => {
        test("should fail if less than or equal to 0", () => {
          expect(() => {
            const options: InterfaceEthereumTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: 128,
              gas: 0
            };
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Ethereum] The gas provided is invalid"));

          expect(() => {
            const options: InterfaceEthereumTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: 128,
              gas: -1
            };
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Ethereum] The gas provided is invalid"));
        });

        test("should default to 1 if not provided", () => {
          const options: InterfaceEthereumTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gasPrice: 128
          };
          const transaction = ethereum.buildTransaction(toAddress, "", options);
          expect(transaction.gas).toBe(1);
        });
      });
      describe("gasPrice", () => {
        test("should fail if less than or equal to 0", () => {
          expect(() => {
            const options: InterfaceEthereumTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gasPrice: -1,
              gas: 21000
            };
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Ethereum] The gasPrice provided is invalid")
          );

          expect(() => {
            const options: InterfaceEthereumTransactionOptions = {
              nonce: 123,
              value: 123,
              from: fromAddress.toString("hex"),
              gas: 21000,
              gasPrice: 0
            };
            ethereum.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Ethereum] The gasPrice provided is invalid")
          );
        });

        test("should default to 1e9 if not provided", () => {
          const options: InterfaceEthereumTransactionOptions = {
            nonce: 210122,
            value: 69,
            from: fromAddress.toString("hex"),
            gas: 11111
          };
          const transaction = ethereum.buildTransaction(toAddress, "", options);
          expect(transaction.gasPrice).toBe(1e9);
        });
      });
    });

    describe("signTransaction", () => {
      let toAddress;
      let fromAddress;
      const transaction: InterfaceEthereumTransaction = {
        gasPrice: "0x09184e72a000",
        gas: "0x2710",
        to: toAddress,
        value: "0x00",
        data:
          "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
        nonce: "0x00"
      };
      beforeEach(() => {
        toAddress = "0x3535353535353535353535353535353535353535";
        fromAddress = new Buffer(
          "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
          "hex"
        );
      });

      test("should sign the transaction", () => {
        const signature = ethereum.signTransaction(transaction, fromAddress);
        expect(signature).toBeInstanceOf(Buffer);
      });
    });

    describe("sendSignedTransaction", () => {
      let signature;
      const transaction: InterfaceEthereumTransaction = {
        gasPrice: "0x09184e72a000",
        gas: "0x2710",
        to: toAddress,
        value: "0x00",
        data:
          "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
        nonce: "0x00"
      };
      beforeEach(() => {
        let fromAddress = new Buffer(
          "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
          "hex"
        );
        signature = ethereum.signTransaction(transaction, fromAddress);
        ethereum = new Ethereum(sdk, ethereumDLTOptions);
      });

      test("should fail if something goes wrong", async done => {
        const mockSendSignedTransaction = jest
          .fn(ethereum.provider.instance.eth.sendSignedTransaction)
          .mockRejectedValue(new Error());

        ethereum.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

        ethereum.sendSignedTransaction(signature).catch(err => {
          expect(err).toStrictEqual(
            new Error(
              "[Ethereum] Something went wrong when sending the signed transaction."
            )
          );
        });

        done();
      });

      test("should return a transaction receipt", async done => {
        const receipt1 = {
          status: true,
          transactionHash:
            "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
          transactionIndex: 0,
          blockHash:
            "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
          blockNumber: 3,
          contractAddress: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
          cumulativeGasUsed: 314159,
          gasUsed: 30234,
          logs: [],
          from: "",
          to: "0x3535353535353535353535353535353535353535",
          logsBloom: ""
        };

        const mockSendSignedTransaction = jest
          .fn(ethereum.provider.instance.eth.sendSignedTransaction)
          .mockResolvedValue(receipt1);

        ethereum.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

        ethereum.sendSignedTransaction(signature).then(receipt => {
          expect(receipt.status).toBe(true);
          expect(receipt.transactionHash).toBe(
            "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
          );
          expect(receipt.transactionIndex).toBe(0);
          expect(receipt.blockHash).toBe(
            "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46"
          );
          expect(receipt.blockNumber).toBe(3);
          expect(receipt.contractAddress).toBe(
            "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"
          );
          expect(receipt.cumulativeGasUsed).toBe(314159);
          expect(receipt.gasUsed).toBe(30234);
          expect(receipt.logs).toStrictEqual([]);
          expect(receipt.from).toBe("");
          expect(receipt.to).toBe("0x3535353535353535353535353535353535353535");
          expect(receipt.logsBloom).toBe("");
        });

        done();
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
        ethereum = new Ethereum(sdk, ethereumDLTOptions);
      });

      test("should fail if something goes wrong", async done => {
        const mockSendSignedTransaction = jest
          .fn(ethereum.provider.instance.eth.sendTransaction)
          .mockRejectedValue(new Error());

        ethereum.provider.instance.eth.sendTransaction = mockSendSignedTransaction;

        ethereum.sendTransaction(transaction).catch(err => {
          expect(err).toStrictEqual(
            new Error(
              "[Ethereum] Something went wrong when sending the transaction."
            )
          );
        });

        done();
      });

      test("should return a transaction receipt", async done => {
        const receipt1 = {
          status: true,
          transactionHash:
            "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
          transactionIndex: 0,
          blockHash:
            "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
          blockNumber: 3,
          contractAddress: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
          cumulativeGasUsed: 314159,
          gasUsed: 30234,
          logs: [],
          from: "",
          to: "0x3535353535353535353535353535353535353535",
          logsBloom: ""
        };

        const mockSendSignedTransaction = jest
          .fn(ethereum.provider.instance.eth.sendTransaction)
          .mockResolvedValue(receipt1);

        ethereum.provider.instance.eth.sendTransaction = mockSendSignedTransaction;

        ethereum.sendTransaction(transaction).then(receipt => {
          expect(receipt.status).toBe(true);
          expect(receipt.transactionHash).toBe(
            "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
          );
          expect(receipt.transactionIndex).toBe(0);
          expect(receipt.blockHash).toBe(
            "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46"
          );
          expect(receipt.blockNumber).toBe(3);
          expect(receipt.contractAddress).toBe(
            "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"
          );
          expect(receipt.cumulativeGasUsed).toBe(314159);
          expect(receipt.gasUsed).toBe(30234);
          expect(receipt.logs).toStrictEqual([]);
          expect(receipt.from).toBe("");
          expect(receipt.to).toBe("0x3535353535353535353535353535353535353535");
          expect(receipt.logsBloom).toBe("");
        });

        done();
      });
    });
  });

  describe("contracts", () => {
    let ethereum = new Ethereum(sdk, ethereumDLTOptions);
    describe("createContract", () => {
      // it("throw error", () => {
      //   expect(() => {
      //     ethereum.createContract();
      //   }).toThrowError(new Error("Method not implemented."));
      // });
    });

    describe("deployContract", () => {
      // it("throw error", () => {
      //   expect(() => {
      //     ethereum.deployContract(123);
      //   }).toThrowError(new Error("Method not implemented."));
      // });
    });
  });

  describe("subscriptions", () => {
    let vechain = new Ethereum(sdk, ethereumDLTOptions);
    describe("subscribe", () => {
      it("throw error", () => {
        expect(() => {
          ethereum.subscribe("error");
        }).toThrowError(new Error("Method not implemented."));
      });
    });

    describe("clearSubscriptions", () => {
      it("throw error", () => {
        expect(() => {
          ethereum.clearSubscriptions();
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });
});
