import FloydSDK from "../../../../src/core/index";
import * as bitcoin from "bitcoinjs-lib";
import Bitcoin from "../../../../src/abstract/dlts/bitcoin/bitcoin.dlt";
import { TypeDLT, TypeAccount } from '../../../../src/types';
import AbstractProvider from '../../../../src/abstract/dlts/provider';
import 'jest-extended';
import AbstractDLT from '../../../../src/abstract/dlts/dlt';

describe("bitcoin", () => {
  var sdk;
  beforeEach(() => {
    const options = {
      dlts: [{ name: "bitcoin" }]
    };
    sdk = new FloydSDK(options);
  });

  describe("dlt", () => {
    it("should instantiate bitcoin as abstracdlt", () => {
      expect(sdk.dlts.bitcoin).toBeInstanceOf(Bitcoin);
    });
  })


  describe("accounts", () => {
    it("address should have the correct length", () => {
      const account = sdk.dlts.bitcoin.addAccount();
      expect(account.privateKey).toBeString();      
      expect(account.address).toBeString();    
    });

    it("should be able to be set with a valid private key", () => {
      const keyPair = bitcoin.ECPair.makeRandom();
      const privateKey = keyPair.toWIF();
      const account = sdk.dlts.bitcoin.addAccount(privateKey);

      expect(account.privateKey).toBeString();      
      expect(account.privateKey).toBe(privateKey);

      expect(account.address).toBeString();
    });

    it("should fail if invalid private key", () => {
      const privateKey = "123";
      try {
        sdk.dlts.bitcoin.addAccount(privateKey);
      } catch (e) {
        expect(e).toEqual(
          Error("[Account] Issue while creating the key pair.")
        );
      }
    });
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = {
        name: "notbitcoin"
      }
      try {
        new Bitcoin(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(Error("[Provider] The Provider for this DLT is not present, please add the provider for notbitcoin manually."));
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = {
        name: "bitcoin"
      }
      const bitcoin = new Bitcoin(sdk, dltOptions);
      expect(bitcoin.provider).toBeInstanceOf(AbstractProvider);
    });
  });
});
