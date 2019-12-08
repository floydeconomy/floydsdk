import FloydSDK from "../../../../src/core/index";
import { TypeDLT } from "../../../../src/utils/types";
import AbstractProvider from "../../../../src/abstract/dlts/provider";
import Binance from "../../../../src/abstract/dlts/binance/binance.dlt";

import "jest-extended";

describe("binance", () => {
  const binanceDLTOptions = {
    name: "binance",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  const notbinanceDLTOptions = {
    name: "notbinance",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  var sdk;
  var binance: Binance;
  beforeEach(() => {
    const options = {
      dlts: [binanceDLTOptions]
    };
    sdk = new FloydSDK(options);
    binance = new Binance(sdk, binanceDLTOptions);
  });

  describe("dlt", () => {
    it("should instantiate binance as abstracdlt", () => {
      expect(sdk.dlts.binance).toBeInstanceOf(Binance);
    });
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = notbinanceDLTOptions;
      try {
        new Binance(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The Provider for this DLT is not present, please add the provider for notbinance manually."
          )
        );
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = binanceDLTOptions;
      const binance = new Binance(sdk, dltOptions);
      expect(binance.provider).toBeInstanceOf(AbstractProvider);
    });
  });

  describe("transaction", () => {
    let toAddress;
    let fromAddress;
    beforeEach(() => {
      toAddress = "binance.provider.instance.eth.accounts.create().address;";
      fromAddress = "binance.provider.instance.eth.accounts.create().address;";
    });

    describe("buildTransaction", () => {
      test("should fail", () => {
        expect(() => {
          binance.buildTransaction("", "", {
            nonce: 123,
            value: 123,
            from: fromAddress.toString("hex"),
            gasPrice: 128,
            gas: 0
          });
        }).toThrowError(new Error("Method not implemented."));
      });
    });
    describe("sendSignedTransaction", () => {
      test("should fail", () => {
        expect(() => {
          binance.sendSignedTransaction(
            new Buffer(
              "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
              "hex"
            )
          );
        }).toThrowError(new Error("Method not implemented."));
      });
    });
    describe("sendTransaction", () => {
      test("should fail", () => {
        expect(() => {
          binance.sendTransaction({
            to: "",
            data: ""
          });
        }).toThrowError(new Error("Method not implemented."));
      });
    });
    describe("signTransaction", () => {
      test("should fail", () => {
        expect(() => {
          binance.signTransaction(
            {
              to: "",
              data: ""
            },
            new Buffer(
              "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
              "hex"
            )
          );
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });

  describe("contracts", () => {
    describe("createContract", () => {
      it("throw error", () => {
        expect(() => {
          binance.createContract(new Buffer("error"));
        }).toThrowError(new Error("Method not implemented."));
      });
    });

    describe("deployContract", () => {
      it("throw error", () => {
        expect(() => {
          binance.deployContract(123);
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });

  describe("subscriptions", () => {
    describe("subscribe", () => {
      it("throw error", () => {
        expect(() => {
          binance.subscribe("error");
        }).toThrowError(new Error("Method not implemented."));
      });
    });

    describe("clearSubscriptions", () => {
      it("throw error", () => {
        expect(() => {
          binance.clearSubscriptions();
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });
});
