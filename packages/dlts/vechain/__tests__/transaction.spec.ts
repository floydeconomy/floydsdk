import Vechain from "../src/vechain.dlt";
import { HEX } from "@floyd/utils";
import "jest-extended";
import {
  IVechainTransaction,
  IVechainTransactionOptions,
  IVechainTransactionReceipt
} from "../utils/interfaces";
import {
  ALICE,
  BOB,
  VECHAIN,
  MOCKRECEIPT,
  MOCKSIGNATURE,
  MOCKTRANSACTION
} from "../utils/helpers";

describe("transactions", () => {
  let vechain: Vechain;
  beforeEach(() => {
    const options = {
      dlts: [VECHAIN]
    };
    vechain = new Vechain(VECHAIN);
  });
  describe("buildTransaction", () => {
    test("should build a vechain transaction", () => {
      const options: IVechainTransactionOptions = {
        nonce: 12345678,
        gasPrice: 128,
        gas: 21000,
        clauses: [
          {
            to: ALICE.address,
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
          to: ALICE.address,
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
  describe("signTransaction", () => {
    test("should sign the transaction using string PK", () => {
      const options: IVechainTransactionOptions = {
        nonce: 12345678,
        gasPrice: 128,
        gas: 21000,
        clauses: [
          {
            to: ALICE.address,
            value: 10,
            data: "0x"
          }
        ]
      };
      const transaction = vechain.buildTransaction(options);
      const signature = vechain.signTransaction(transaction, BOB.privateKey);
      expect(signature).toBeString();
      expect(signature).toStartWith("0x");
      expect(signature).toBe(
        "0xf86b819a8012d8d7947f4ab4b4b6a5c270c62997835baba027dde1ccb00a8081808252088083bc614ec0b841f688310efb2f7e3bc9e7967d127fab4b36906e8fafbbcc766704022819b6970d5df5f9393e2685f46fbacf04a6f923eaf05fe98ae47a27f8f4da008e660370ce01"
      );
    });
    test("should sign the transaction using Buffer PK", () => {
      const options: IVechainTransactionOptions = {
        nonce: 12345678,
        gasPrice: 128,
        gas: 21000,
        clauses: [
          {
            to: ALICE.address,
            value: 10,
            data: "0x"
          }
        ]
      };
      const transaction = vechain.buildTransaction(options);
      const signature = vechain.signTransaction(
        transaction,
        Buffer.from(BOB.privateKey, HEX)
      );
      expect(signature).toBeString();
      expect(signature).toBe(
        "0xf86b819a8012d8d7947f4ab4b4b6a5c270c62997835baba027dde1ccb00a8081808252088083bc614ec0b841f688310efb2f7e3bc9e7967d127fab4b36906e8fafbbcc766704022819b6970d5df5f9393e2685f46fbacf04a6f923eaf05fe98ae47a27f8f4da008e660370ce01"
      );
    });
  });
  describe("sendSignedTransaction", () => {
    test("should throw error if 0x is not prefixed", () => {
      vechain.sendSignedTransaction(MOCKSIGNATURE.slice(2)).catch(err => {
        expect(err).toStrictEqual(
          new Error("[Vechain] The signature provided must be prefixed with 0x")
        );
      });
    });
    test("should throw error if something goes wrong", async () => {
      const mockSendSignedTransaction = jest
        .fn(vechain.provider.instance.eth.sendSignedTransaction)
        .mockRejectedValue(new Error());

      vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

      vechain.sendSignedTransaction(MOCKSIGNATURE).catch(err => {
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
        // @ts-ignore
        .mockResolvedValue(MOCKRECEIPT);

      vechain.provider.instance.eth.sendSignedTransaction = mockSendSignedTransaction;

      vechain
        .sendSignedTransaction(MOCKSIGNATURE)
        .then((receipt: IVechainTransactionReceipt) => {
          expect(receipt.reward).toBe("0x1164d68d9b4ba8000");
          expect(receipt.reverted).toBe(false);
          expect(receipt.paid).toBe("0x39facb2d5afc30000");
          expect(receipt.gasPayer).toBe(
            "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e"
          );
          expect(receipt.gasUsed).toBe(66846);
          expect(receipt.meta).toBeObject();
          expect(receipt.outputs).toBeArray();
          expect(receipt.transactionHash).toBe(
            "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
          );
          expect(receipt.blockHash).toBe(
            "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
          );
          expect(receipt.blockNumber).toBe(2257);
          expect(receipt.gasUsed).toBe(66846);
          expect(receipt.status).toBe("0x1");
        });
    });
  });
  describe("sendTransaction", () => {
    test("should fail if something goes wrong", async () => {
      const mockSendSignedTransaction = jest
        .fn(vechain.provider.instance.eth.sendTransaction)
        .mockRejectedValue(new Error());
      vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;
      vechain.sendTransaction(MOCKTRANSACTION).catch(err => {
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
        // @ts-ignore
        .mockResolvedValue(MOCKRECEIPT);

      vechain.provider.instance.eth.sendTransaction = mockSendSignedTransaction;

      vechain.sendTransaction(MOCKTRANSACTION).then(receipt => {
        expect(receipt.reward).toBe("0x1164d68d9b4ba8000");
        expect(receipt.reverted).toBe(false);
        expect(receipt.paid).toBe("0x39facb2d5afc30000");
        expect(receipt.gasPayer).toBe(
          "0x4f6FC409e152D33843Cf4982d414C1Dd0879277e"
        );
        expect(receipt.gasUsed).toBe(66846);
        expect(receipt.meta).toBeObject();
        expect(receipt.outputs).toBeArray();
        expect(receipt.transactionHash).toBe(
          "0x0d79ef6830ee3a8ad55d31b4c30e53ebf2252da90db6074f9304889c682f0490"
        );
        expect(receipt.blockHash).toBe(
          "0x000008d168c7d5ca180a0f5cf0aba148982b9d5bed263ee8bdc94e6863962a86"
        );
        expect(receipt.blockNumber).toBe(2257);
        expect(receipt.gasUsed).toBe(66846);
        expect(receipt.status).toBe("0x1");
      });
    });
  });
});
