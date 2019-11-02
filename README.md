# FloydSDK - Interoperabilty Typescript API

This is the FloydSDK [JavaScript API] which serves as an interoperability software development kit that allows developers to utilise multiple blockchain through a single interface.

Supported blockchains:
- Ethereum [web3](https://github.com/ethereum/web3.js)
- Vechain [thorify](https://github.com/vechain/thorify)
- Binance Chain [bnb-js-sdk](https://github.com/binance-chain/javascript-sdk/)

## Installation

### Node

```bash
npm install floyd
```

### Yarn

```bash
yarn add floyd
```

### Test
```bash
yarn test
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

```typescript
import FloydSDK from 'floyd';
const options = {
    dlts: [
    { 
        name: "ethereum", 
        provider: {
            uri: "http://localhost:4444"
        }
    },
    {
        name: "binance",
        provider: {
            uri: "http://localhost:8485"
        }
    }
]};
const floyd = new FloydSDK(options);
```

## Contributing

- Please follow the code style of the other files, we use 4 spaces as tabs.

### Requirements

* [Node.js](https://nodejs.org)
* npm
* jest
* Ethereum node
* Vechain node
* Binance chain node