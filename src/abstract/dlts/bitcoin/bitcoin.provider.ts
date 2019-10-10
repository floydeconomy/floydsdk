import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';

class BitcoinProvider extends AbstactProvider {
    constructor(options: TypeProvider) {
        super(options);
    }
    createProvider(options: Object): void {
        // throw new Error('Method not implemented.');
    }   
    validateProvider(options: Object): void {
        // throw new Error('Method not implemented.');
    }
}

export default BitcoinProvider;