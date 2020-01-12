import FloydSDK from "../src/sdk";

describe("core", () => {
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
          "[DLT]-[ModuleError] The DLT provided is not valid, add wrongdlt manually"
        )
      );
    }
  });
  test("should be able to instantiate multiple dlts", () => {
    let options = {
      dlts: [
        {
          name: "vechain",
          provider: {
            uri: "http://localhost:4444"
          }
        }
        // {
        //   name: "ethereum",
        //   provider: {
        //     uri: "http://localhost:4444"
        //   }
        // }
      ]
    };

    var sdk = new FloydSDK(options);
    expect(sdk.dlts.Vechain).toBeDefined();
    expect(sdk.dlts.Vechain.provider).toBeDefined();

    // TODO: make ethereum work
    // expect(sdk.dlts.ethereum).toBeDefined();
    // expect(sdk.dlts.ethereum.provider).toBeDefined();
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
        }
      ]
    };

    try {
      new FloydSDK(options);
    } catch (e) {
      expect(e).toEqual(
        Error(
          "[DLT]-[ModuleError] The DLT provided is not valid, add wrongdlt manually"
        )
      );
    }
  });
  test("should fail if uri not provided with dlt", () => {
    let options = {
      dlts: [
        {
          name: "Vechain",
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
        URIError("[Provider]-[uri:] The URI provided for this DLT is not valid")
      );
    }
  });
});
