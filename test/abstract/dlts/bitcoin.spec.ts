import FloydSDK from "../../../src/core/index";
import * as bitcoin from "bitcoinjs-lib";

describe("bitcoin", () => {
  const ADDRESS_LENGTH = 34;
  const PRIVATEKEY_LENGTH = 52;

  describe("accounts", () => {
    var sdk;
    beforeEach(()=> {
        const options = {
            dlts: [{ dlt: "bitcoin" }]
          };
        sdk = new FloydSDK(options);
      });

    it("address should have the correct length", () => {
      const account = sdk.dlts.bitcoin.addAccount();
      expect(account.address).toHaveLength(ADDRESS_LENGTH);
      expect(account.privateKey).toHaveLength(PRIVATEKEY_LENGTH);
    });

    it('should be able to be set with a valid private key', () => {
        const keyPair = bitcoin.ECPair.makeRandom();
        const privateKey = keyPair.toWIF();
        const account = sdk.dlts.bitcoin.addAccount(privateKey);
        expect(account.privateKey).toBe(privateKey);
    });

    it('should fail if invalid private key', () => {
        const privateKey = "123";
        try {
            sdk.dlts.bitcoin.addAccount(privateKey);
        } catch (e) {
            expect(e).toEqual(Error("Private key provided is invalid"));
        }
    });
  });
});
