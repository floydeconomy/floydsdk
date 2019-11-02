import { TypeProvider } from "../../../../src/types";
import VechainProvider from "../../../../src/abstract/dlts/vechain/vechain.provider";
import Web3 from "web3";

describe("Vechain provider", () => {
  describe("timeout", () => {
    describe("attribute", () => {
      test("should default to 0 if not provided", () => {
        var options: TypeProvider = {
          uri: "http://localhost:8545"
        };

        var provider = new VechainProvider(options);

        expect(provider.timeout).toBe(0);
      });

      test("should be able to be set to an arbritary number", () => {
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

      test("should be able to be set to more than or equal to 0", () => {
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
          uri: "xx"
        };
  
        try {
          new VechainProvider(options);
        } catch (e) {
          expect(e).toEqual(
            Error("[Provider]-[uri:xx] The URI provided for this DLT is not valid")
          );
        }
      });
  
      test("should throw error when if anything is wrong with the provider", () => {
        var options: TypeProvider = {
          uri: "localhost:4444"
        };
  
        try {
          new VechainProvider(options);
        } catch (e) {
          expect(e).toEqual(
            Error(`[Provider]-[uri:localhost:4444] There was an issue creating the provider`)
          );
        }
      });
  });
});
