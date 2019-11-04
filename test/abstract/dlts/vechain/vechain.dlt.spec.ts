import FloydSDK from "../../../../src/core/index";
import Vechain from "../../../../src/abstract/dlts/vechain/vechain.dlt";
import { TypeDLT } from "../../../../src/utils/types/index";
import VechainProvider from "../../../../src/abstract/dlts/vechain/vechain.provider";
import { cry } from "thor-devkit";
import "jest-extended";
import { InterfaceVechainTransactionOptions, InterfaceVechainTransaction } from "../../../../src/utils/interfaces";

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

  var sdk;
  var vechain: Vechain;
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
          amount: 21000,
          from: fromAddress.toString("hex"),
          gasPriceCoef: 128,
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
            amount: 21000,
            from: fromAddress.toString("hex"),
            gasPriceCoef: 128,
            gas: 21000
          };
          expect(() => {
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The nonce provided is invalid"));
        });
        test("should default to null if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            amount: 21000,
            from: fromAddress.toString("hex"),
            gasPriceCoef: 128,
            gas: 21000
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.nonce).toBe(0);
        });
      });
      describe("amount", () => {
        test("should fail if less than 0", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            amount: -1,
            from: fromAddress.toString("hex"),
            gasPriceCoef: 128,
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
              amount: 123,
              from: fromAddress.toString("hex"),
              gasPriceCoef: 128,
              gas: 0
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The gas provided is invalid"));

          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              amount: 123,
              from: fromAddress.toString("hex"),
              gasPriceCoef: 128,
              gas: -1
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(new Error("[Vechain] The gas provided is invalid"));
        });

        test("should default to 21000 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            amount: 69,
            from: fromAddress.toString("hex"),
            gasPriceCoef: 128
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
              amount: 123,
              from: fromAddress.toString("hex"),
              gasPriceCoef: -1,
              gas: 21000
            };
            vechain.buildTransaction(toAddress, "", options);
          }).toThrowError(
            new Error("[Vechain] The gasPriceCoef provided is invalid")
          );

          expect(() => {
            const options: InterfaceVechainTransactionOptions = {
              nonce: 123,
              amount: 123,
              from: fromAddress.toString("hex"),
              gasPriceCoef: 0,
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
            amount: 69,
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
            amount: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPriceCoef: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.chainTag).toBe(0x9a);
        });
      })

      describe("blockRef", () => {
        test("should default to 0x0000000000000000 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            amount: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPriceCoef: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.blockRef).toBe("0x0000000000000000");
        });
      })

      describe("expiration", () => {
        test("should default to 32 if not provided", () => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 210122,
            amount: 69,
            from: fromAddress.toString("hex"),
            gas: 11111,
            gasPriceCoef: 128
          };
          const transaction = vechain.buildTransaction(toAddress, "", options);
          expect(transaction.expiration).toBe(32);
        });
      })
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
          amount: 21000,
          from: fromAddress.toString("hex"),
          gasPriceCoef: 128,
          gas: 21000
        };

        const transaction = vechain.buildTransaction(toAddress, "", options);
        const signature  = vechain.signTransaction(transaction, fromAddress);
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
      test("should fail", () => {
        expect(() => {
          vechain.sendSignedTransaction(
            new Buffer(
              "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
              "hex"
            )
          );
        }).toThrowError(new Error("Method not implemented."));
      });
    });

    describe("sendTransaction", () => {
      test("should fail", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: 12345678,
          amount: 21000,
          from: fromAddress.toString("hex"),
          gasPriceCoef: 128,
          gas: 21000
        };

        const transaction = vechain.buildTransaction(toAddress, "", options);

        expect(() => {
          vechain.sendTransaction(transaction);
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });
});
