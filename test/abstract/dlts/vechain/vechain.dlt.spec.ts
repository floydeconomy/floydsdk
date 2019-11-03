import FloydSDK from "../../../../src/core/index";
import Vechain from "../../../../src/abstract/dlts/vechain/vechain.dlt";
import { TypeDLT, InterfaceVechainTransactionOptions, InterfaceVechainTransaction } from "../../../../src/types/index";
import VechainProvider from "../../../../src/abstract/dlts/vechain/vechain.provider";
import { cry } from "thor-devkit";
import 'jest-extended';

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
  var vechain;
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

  describe("transaction", () => {
    describe("buildTransaction", () => {
      let toAddress;
      let fromAddress;
      beforeEach(() => {
        toAddress = cry.publicKeyToAddress(cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey()));
        fromAddress = cry.publicKeyToAddress(cry.secp256k1.derivePublicKey(cry.secp256k1.generatePrivateKey()));
      });
      test("should build a vechain transaction", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: 12345678,
          amount: 21000,
          from: fromAddress.toString('hex'),
          gasPriceCoef: 128,
          gas: 21000,
        }
  
        const transaction = vechain.buildTransaction(toAddress,"", options);
  
        expect(transaction.nonce).toBe(12345678);
        expect(transaction.value).toBe(21000);
        expect(transaction.from).toBe(fromAddress.toString('hex'));
        expect(transaction.to).toBe(toAddress);
        expect(transaction.gasPriceCoef).toBe(128);
        expect(transaction.gas).toBe(21000);
        expect(transaction.dependsOn).toBe(undefined);
        expect(transaction.expiration).toBe(undefined);
        expect(transaction.blockRef).toBe(undefined);
        expect(transaction.chainTag).toBe(undefined);
      });
      test("should fail if nonce less than 0", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: -1,
          amount: 21000,
          from: fromAddress.toString('hex'),
          gasPriceCoef: 128,
          gas: 21000,
        }
        expect(() => {
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The nonce provided is invalid'));
      });
      test("should set nonce to null if not provided", () => {
        const options: InterfaceVechainTransactionOptions = {
          amount: 21000,
          from: fromAddress.toString('hex'),
          gasPriceCoef: 128,
          gas: 21000,
        }
        const transaction = vechain.buildTransaction(toAddress,"", options)
        expect(transaction.nonce).toBe(0);
      });
      test("should fail if amount less than 0", () => {
        const options: InterfaceVechainTransactionOptions = {
          nonce: 123,
          amount: -1,
          from: fromAddress.toString('hex'),
          gasPriceCoef: 128,
          gas: 21000,
        }

        expect(() => {
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The amount provided is invalid'));
      });
      test("should fail if gas less than or equal to 0", () => {
        expect(() => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            amount: 123,
            from: fromAddress.toString('hex'),
            gasPriceCoef: 128,
            gas: 0,
          }   
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The gas provided is invalid'));

        expect(() => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            amount: 123,
            from: fromAddress.toString('hex'),
            gasPriceCoef: 128,
            gas: -1,
          }
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The gas provided is invalid'));
      });
      test("should fail if gasPriceCoef less than or equal to 0", () => {
        expect(() => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            amount: 123,
            from: fromAddress.toString('hex'),
            gasPriceCoef: -1,
            gas: 21000,
          }   
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The gasPriceCoef provided is invalid'));

        expect(() => {
          const options: InterfaceVechainTransactionOptions = {
            nonce: 123,
            amount: 123,
            from: fromAddress.toString('hex'),
            gasPriceCoef: 0,
            gas: 21000,
          }
          vechain.buildTransaction(toAddress,"", options)
        }).toThrowError(new Error('[Vechain] The gasPriceCoef provided is invalid'));
      });
    })
  });
});
