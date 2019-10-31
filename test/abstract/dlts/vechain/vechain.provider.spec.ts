import { TypeProvider } from "../../../../src/types";
import VechainProvider from "../../../../src/abstract/dlts/vechain/vechain.provider";
import Web3 from 'web3';

describe("Vechain provider", () => {
  describe("timeout", () => {
    test("should default timeout to 0 if not provided", () => {
      var options: TypeProvider = {
        uri: "http://localhost:8545"
      };

      var provider = new VechainProvider(options);

      expect(provider.timeout).toBe(0);
    });

    test("should timeout should be able to be set to an arbritary number", () => {
      var provider = new VechainProvider({
        uri: "http://localhost:8545",
        timeout: 100
      });

      expect(provider.timeout).toBe(100);

      var provider2 = new VechainProvider({
        uri: "http://localhost:8545",
        timeout: 1000
      });
      expect(provider2.timeout).toBe(1000);
    });

    test("should timeout should not be able to set less than 0", () => {
      var provider = new VechainProvider({
        uri: "http://localhost:8545",
        timeout: 0
      });

      expect(provider.timeout).toBe(0);

      var provider2 = new VechainProvider({
        uri: "http://localhost:8545",
        timeout: 1
      });

      expect(provider2.timeout).toBe(1);

      var provider2 = new VechainProvider({
        uri: "http://localhost:8545",
        timeout: -1
      });
      expect(provider2.timeout).toBe(0);
    });
  });

  describe("thorify", () => {
    test("should be instantiated when uri is provided", () => {
      var options: TypeProvider = {
        uri: "http://localhost:8545"
      };

      var provider = new VechainProvider(options);
      expect(provider.instance).toBeInstanceOf(Web3);
    });

    test("should throw error when invalid uri provided", () => {
      var options: TypeProvider = {
        uri: "localhost:8545"
      };
      try {
        new VechainProvider(options);
      } catch (e) {
        expect(e).toEqual(
          Error("[Vechain] The URI provided for this DLT is not valid")
        );
      }
    });
  });
});
