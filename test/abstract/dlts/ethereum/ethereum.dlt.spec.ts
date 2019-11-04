import FloydSDK from "../../../../src/core/index";
import Ethereum from "../../../../src/abstract/dlts/ethereum/ethereum.dlt";
import { TypeDLT } from "../../../../src/utils/types/index";
import AbstractProvider from "../../../../src/abstract/dlts/provider";
import {
  InterfaceEthereumTransaction,
  InterfaceEthereumTransactionReceipt
} from "../../../../src/utils/interfaces/index";
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
    describe("buildTransaction", () => {
      let toAddress;
      let fromAddress;
      beforeEach(() => {
        // toAddress = cry.publicKeyToAddress(
        //   cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
        // );
        // fromAddress = cry.publicKeyToAddress(
        //   cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey())
        // );
      });
      test("should build a ethereum transaction", () => {
        // const options: InterfaceEthereumTransactionOptions = {
        //   nonce: 12345678,
        //   amount: 21000,
        //   from: fromAddress.toString("hex"),
        //   gasPriceCoef: 128,
        //   gas: 21000
        // };
        // const transaction = ethereum.buildTransaction(toAddress, "", options);
        // expect(transaction.nonce).toBe(12345678);
        // expect(transaction.value).toBe(21000);
        // expect(transaction.from).toBe(fromAddress.toString("hex"));
        // expect(transaction.to).toBe(toAddress);
        // expect(transaction.gasPriceCoef).toBe(128);
        // expect(transaction.gas).toBe(21000);
        // expect(transaction.dependsOn).toBe(null);
        // expect(transaction.expiration).toBe(32);
        // expect(transaction.blockRef).toBe("0x0000000000000000");
        // expect(transaction.chainTag).toBe(0x9a);
      });
    });

    describe("signTransaction", () => {
      let toAddress;
      let fromAddress;
      beforeEach(() => {
        toAddress = "0x3535353535353535353535353535353535353535";
        fromAddress = new Buffer(
          "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
          "hex"
        );
      });

      test("should sign the transaction", () => {
        const transaction: InterfaceEthereumTransaction = {
          gasPrice: "20000000000",
          gas: "21000",
          to: toAddress,
          value: "1000000000000000000",
          data: "",
          nonce: "0x0"
        };

        const signature = ethereum.signTransaction(transaction, fromAddress);
        expect(signature).toBeInstanceOf(Buffer);
      });
    });

    describe("sendSignedTransaction", () => {
      let signature;
      beforeEach(() => {
        let fromAddress = new Buffer(
          "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
          "hex"
        );
        const transaction: InterfaceEthereumTransaction = {
          gasPrice: "20000000000",
          gas: "21000",
          to: "0x3535353535353535353535353535353535353535",
          value: "1000000000000000000",
          data: "",
          nonce: "0x0"
        };
        signature = ethereum.signTransaction(transaction, fromAddress);
        ethereum = new Ethereum(sdk, ethereumDLTOptions);
      });

      test("should fail if something goes wrong", async () => {
        const mockSendSignedTransaction = jest
          .fn(ethereum.provider.instance.eth.sendSignedTransaction)
          .mockRejectedValue(new Error());

        ethereum.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

        ethereum.sendSignedTransaction(signature).catch(err => {
          expect(err).toStrictEqual(new Error('[Ethereum] Something went wrong when sending the signed transaction.'))
        });
      });

      test("should return a transaction receipt", async () => {
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
      });
    });
  });
});
