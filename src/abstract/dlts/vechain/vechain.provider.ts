import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';
import Web3 from 'web3';
import { thorify } from "thorify";

export class VechainProvider extends AbstactProvider {
    /** @inheritdoc */
    constructor(options: TypeProvider) {
        super(options);
    }

    /** @inheritdoc */
    setProvider(options: TypeProvider): void {
        try {
            this.instance = thorify(new Web3(""), options.uri);
        } catch (e) {
            throw new Error(`[Vechain] The URI provided for this DLT is not valid`);
        }
    }
}

export default VechainProvider;