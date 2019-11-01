import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';
import Web3 from 'web3';

export class EthereumProvider extends AbstactProvider {
    /** @inheritdoc */
    constructor(options: TypeProvider) {
        super(options);
    }

    /** @inheritdoc */
    setProvider(options: TypeProvider): void {
        try {
            this.instance = new Web3(options.uri);
        } catch (e) {
            throw new Error(`[Ethereum] The URI provided for this DLT is not valid`);
        }
    }
}

export default EthereumProvider;