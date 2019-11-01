import FloydSDK from "../../src/core/index";

describe("core", () => {
  describe("dlts", () => {
    test("should throw error if dlts is empty", () => {
      let options = {
        dlts: []
      };
      try {
        new FloydSDK(options);
      } catch (e) {
        expect(e).toEqual(Error("[DLT] There arent any DLTs provided."));
      }
    });

    test("should throw error if wrong dlt name", () => {
      let options = {
        dlts: [{ name: "wrongdlt", provider: { uri: "" } }]
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
    test("should be able to instantiate multiple dlts", () => {
      let options = {
        dlts: [
          {
            name: "bitcoin",
            provider: {
              uri: "http://localhost:4444"
            }
          },
          {
            name: "vechain",
            provider: {
              uri: "http://localhost:4444"
            }
          },
          {
            name: "ethereum",
            provider: {
              uri: "http://localhost:4444"
            }
          }
        ]
      };

      var sdk = new FloydSDK(options);
      expect(sdk.dlts.bitcoin).toBeDefined;
      expect(sdk.dlts.vechain).toBeDefined;
      expect(sdk.dlts.ethereum).toBeDefined;
    });

    test("should fail if one of the dlts is wrong", () => {
      let options = {
        dlts: [
          {
            name: "vechain",
            provider: {
              uri: "http://localhost:4444"
            }
          },
          {
            name: "wrongdlt",
            provider: {
              uri: "http://localhost:4444"
            }
          },
          {
            name: "ethereum",
            provider: {
              uri: "http://localhost:4444"
            }
          }
        ]
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

    test("should fail if uri not provided with dlt", () => {
      let options = {
        dlts: [
          {
            name: "vechain",
            provider: {
              uri: ""
            }
          }
        ]
      };

      try {
        new FloydSDK(options);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The URI provided for this provider is invalid, please retry with a valid URI for vechain"
          )
        );
      }
    });
  });
});
