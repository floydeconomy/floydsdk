import FloydSDK from "../../../../src/core/index";
import Ethereum from "../../../../src/abstract/dlts/ethereum/ethereum.dlt";
import { TypeDLT } from "../../../../src/utils/types/index";
import AbstractProvider from "../../../../src/abstract/dlts/provider";

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
  beforeEach(() => {
    const options = {
      dlts: [ethereumDLTOptions]
    };
    sdk = new FloydSDK(options);
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
});
