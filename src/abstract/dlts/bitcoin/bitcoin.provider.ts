import AbstactProvider from '../provider';
import { TypeProvider } from '../../../types';
export class BitcoinProvider extends AbstactProvider {
    constructor(options: TypeProvider) {
        super(options);
    }
    setProvider(options: Object): void {
        // throw new Error('Method not implemented.');
    }
}

export default BitcoinProvider;