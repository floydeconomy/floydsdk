import FloydSDK from "../../../../src/core/index";
import * as bitcoin from "bitcoinjs-lib";
import Bitcoin from "../../../../src/abstract/dlts/bitcoin/bitcoin";
import { TypeSDK } from '../../../../src/types';

describe("bitcoin provider", () => {
    const options: TypeSDK = { dlts: [{ name: "bitcoin" }]};
    const sdk = new FloydSDK(options);
    // const bitcoin = new Bitcoin(sdk);
    it('test', () => {

    });
});