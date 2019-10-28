import FloydSDK from "../../../../src/core/index";
import * as bitcoin from "bitcoinjs-lib";
import Bitcoin from "../../../../src/abstract/dlts/bitcoin/bitcoin.dlt";
import { TypeProvider } from "../../../../src/types";
import BitcoinProvider from "../../../../src/abstract/dlts/bitcoin/bitcoin.provider";
describe("bitcoin provider", () => {
  describe("network", () => {
    test("should default to testnet if network not provider", () => {
      let options: TypeProvider = {};
      let provider = new BitcoinProvider(options);
      expect(provider.network).toBe("testnet");
    });

    test("should be set to network to mainet", () => {
        let options: TypeProvider = {
            network: "mainnet"
        }
        let provider = new BitcoinProvider(options);
        expect(provider.network).toBe("mainnet");
    });

    // test("should be able to be set to mainnet", () => {
    //   let sdk = new FloydSDK(options);
    //   expect(sdk.network).toBe("mainnet");
    // });
  });
});
