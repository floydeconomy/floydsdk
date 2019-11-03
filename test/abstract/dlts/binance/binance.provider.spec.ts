import { TypeProvider } from "../../../../src/utils/types";
import BinanceProvider from "../../../../src/abstract/dlts/binance/binance.provider";
import BnbApiClient from '@binance-chain/javascript-sdk';

describe("Binance provider", () => {
  describe("timeout", () => {
    test("should default timeout to 0 if not provided", (done) => {
      var options: TypeProvider = {
        uri: "https://testnet-dex.binance.org/"
      };

      var provider = new BinanceProvider(options);

      expect(provider.timeout).toBe(0);
      done();
    });

    test("should timeout should be able to be set to an arbritary number", (done) => {
      var provider = new BinanceProvider({
        uri: "https://testnet-dex.binance.org/",
        timeout: 100
      });

      expect(provider.timeout).toBe(100);

      var provider2 = new BinanceProvider({
        uri: "https://testnet-dex.binance.org/",
        timeout: 1000
      });
      expect(provider2.timeout).toBe(1000);
      done();
    });

    test("should timeout should not be able to set less than 0", (done) => {
      var provider = new BinanceProvider({
        uri: "https://testnet-dex.binance.org/",
        timeout: 0
      });

      expect(provider.timeout).toBe(0);

      var provider2 = new BinanceProvider({
        uri: "https://testnet-dex.binance.org/",
        timeout: 1
      });

      expect(provider2.timeout).toBe(1);

      var provider2 = new BinanceProvider({
        uri: "https://testnet-dex.binance.org/",
        timeout: -1
      });
      expect(provider2.timeout).toBe(0);
      done();
    });
  });

  describe("web3", () => {
    test("should be instantiated when uri is provided", (done) => {
      var options: TypeProvider = {
        uri: "https://testnet-dex.binance.org/"
      };

      var provider = new BinanceProvider(options);

      // expect(provider.instance).toBeInstanceOf(BnbApiClient);
      done();
    });

    test("should throw error when invalid uri provided", (done) => {
      var options: TypeProvider = {
        uri: "xx"
      };

      try {
        new BinanceProvider(options);
      } catch (e) {
        expect(e).toEqual(
          Error("[Provider]-[uri:xx] The URI provided for this DLT is not valid")
        );
      }

      done();
    });

    test("should throw error when if anything is wrong with the provider", () => {
      // create tests for the provider
    });
  });
});
