import FloydSDK from "../../src/core/index";
import { TypeSDK, TypeDLT } from "../../src/types";

describe("core", () => {
  let options: TypeSDK;

  describe("network", () => {
    test("should default to testnet", () => {
      options = {
        dlts: [{
          name: "bitcoin"
        }]
      };
      let sdk = new FloydSDK(options);
      expect(sdk.network).toBe("testnet");
    });

    test("should be able to be set to mainnet", () => {
      options = {
        dlts: [{ name: "bitcoin" }],
        network: "mainnet"
      };
      let sdk = new FloydSDK(options);
      expect(sdk.network).toBe("mainnet");
    });
  });

  describe("dlts", () => {
    test("should throw error if dlts is empty", () => {
      options = {
        dlts: []
      };
      try {
        new FloydSDK(options);
      } catch (e) {
        expect(e).toEqual(Error("[DLT] There arent any DLTs provided."));
      }
    });

    test("should throw error if wrong dlt name", () => {
      options = {
        dlts: [{ name: "wrongdlt" }]
      };

      try {
        new FloydSDK(options);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[DLT] The DLT name provided is not valid, please add wrongdlt manually"
          )
        );
      }
    });
  });
});
