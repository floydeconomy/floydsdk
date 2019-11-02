import FloydSDK from "../../../../src/core/index";
import { TypeDLT } from "../../../../src/types";
import AbstractProvider from "../../../../src/abstract/dlts/provider";
import Binance from '../../../../src/abstract/dlts/binance/binance.dlt';

import "jest-extended";

describe("binance", () => {
  const binanceDLTOptions = {
    name: "binance",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  const notbinanceDLTOptions = {
    name: "notbinance",
    provider: {
      uri: "http://localhost:4444"
    }
  };
  
  var sdk;
  beforeEach(() => {
    const options = {
      dlts: [binanceDLTOptions]
    };
    sdk = new FloydSDK(options);
  });

  describe("dlt", () => {
    it("should instantiate binance as abstracdlt", () => {
      expect(sdk.dlts.binance).toBeInstanceOf(Binance);
    });
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = notbinanceDLTOptions;
      try {
        new Binance(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The Provider for this DLT is not present, please add the provider for notbinance manually."
          )
        );
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = binanceDLTOptions;
      const binance = new Binance(sdk, dltOptions);
      expect(binance.provider).toBeInstanceOf(AbstractProvider);
    });
  });
});
