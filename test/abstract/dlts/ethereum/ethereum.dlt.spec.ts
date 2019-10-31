import FloydSDK from "../../../../src/core/index";
import Ethereum from "../../../../src/abstract/dlts/ethereum/ethereum.dlt";
import { TypeDLT, TypeAccount } from '../../../../src/types';
import AbstractProvider from '../../../../src/abstract/dlts/provider';

import 'jest-extended';

describe("bitcoin", () => {
  var sdk;
  beforeEach(() => {
    const options = {
      dlts: [{ name: "ethereum" }]
    };
    sdk = new FloydSDK(options);
  });

  describe("dlt", () => {
    it("should instantiate ethereum as abstracdlt", () => {
      expect(sdk.dlts.ethereum).toBeInstanceOf(Ethereum);
    });
  })

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = {
        name: "notbitcoin"
      }
      try {
        new Ethereum(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(Error("[Provider] The Provider for this DLT is not present, please add the provider for notbitcoin manually."));
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = {
        name: "ethereum"
      }
      const ethereum = new Ethereum(sdk, dltOptions);
      expect(ethereum.provider).toBeInstanceOf(AbstractProvider);
    });
  });
});
