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
    test("should be able to instantiate multiple dlts", () => {
      let options = {
        dlts: [{ name: "bitcoin" }, { name: "vechain"}, { name: "ethereum"}]
      };

      var sdk = new FloydSDK(options);
      expect(sdk.dlts.bitcoin).toBeDefined;
      expect(sdk.dlts.vechain).toBeDefined;
      expect(sdk.dlts.ethereum).toBeDefined;
    });

    test("should fail if one of the dlts is wrong", () => {
      let options = {
        dlts: [{ name: "bitcoin" }, { name: "wrongdlt"}, { name: "ethereum"}]
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
