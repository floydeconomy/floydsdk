import CrossledgerSDK from "../../src/core/index";

describe("core", () => {
  describe("network", () => {
    test("should default to testnet", () => {
      const options = {
        dlts: [{ dlt: "bitcoin" }]
      };
      let sdk = new CrossledgerSDK(options);
      expect(sdk.network).toBe("testnet");
    });

    test("should be able to be set to mainnet", () => {
      const options = {
        dlts: [{ dlt: "bitcoin" }],
        provider: {
            network: "mainnet",
            timeout: 1000,
        }
      };
      let sdk = new CrossledgerSDK(options);
      expect(sdk.network).toBe("mainnet");
    });
  });

  describe("validate", () => {
    test("should throw error if dlts is empty", () => {
        const options = {
            dlts: []
        };
        try {
            new CrossledgerSDK(options)
        } catch (e) {
            expect(e).toEqual(Error('There arent any DLTs provided.'));
        }
    });
  });
});
