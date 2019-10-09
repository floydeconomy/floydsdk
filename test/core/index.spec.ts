import FloydSDK from "../../src/core/index";

describe("core", () => {
  describe("network", () => {
    test("should default to testnet", () => {
      const options = {
        dlts: [{ name: "bitcoin" }]
      };
      let sdk = new FloydSDK(options);
      expect(sdk.network).toBe("testnet");
    });

    test("should be able to be set to mainnet", () => {
      const options = {
        dlts: [{ name: "bitcoin" }],
        provider: {
            network: "mainnet",
            timeout: 1000,
        }
      };
      let sdk = new FloydSDK(options);
      expect(sdk.network).toBe("mainnet");
    });
  });

  describe("dlts", () => {
    test("should throw error if dlts is empty", () => {
        const options = {
            dlts: []
        };
        try {
            new FloydSDK(options)
        } catch (e) {
            expect(e).toEqual(Error('There arent any DLTs provided.'));
        }
    });

    test("should throw error if wrong dlt name", () => {
      const options = {
        dlts: [{ name: "wrongdlt" }]
      };

      try {
        new FloydSDK(options);
      } catch (e) {
        expect(e).toEqual(Error("The DLT name provided is not valid, please add wrongdlt manually"));
      }
    });
  });
});
