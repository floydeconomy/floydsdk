import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';
import Web3 from 'web3';

export class EthereumProvider extends AbstactProvider {
    /** Instance of the web3 provider */
    web3: Web3;

    /** @inheritdoc */
    constructor(options: TypeProvider) {
        super(options);
    }

    /** @inheritdoc */
    setProvider(options: TypeProvider): void {
        try {
            this.web3 = new Web3(options.uri);
        } catch (e) {
            throw new Error(`[Ethereum] The URI provided for this DLT is not valid`);
        }
    }
}

export default EthereumProvider;