# FloydSDK - Interoperabilty Typescript API

This is the FloydSDK [JavaScript API]
which connects to the [web3](https://github.com/ethereum/web3.js).

You need to run a local or remote Ethereum node to use this library.

Please read the [documentation][docs] for more.

## Installation

### Node

```bash
npm install floyd
```

### Yarn

```bash
yarn add floyd
```

### Usage with TypeScript

We support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `web3.js` as follows:

```typescript
import FloydSDK from 'floyd';
const options = {
    dlts: [{ name: "bitcoin" }]
};
const floyd = new FloydSDK(options);
```

## Contributing

- Please follow the code style of the other files, we use 4 spaces as tabs.

### Requirements

* [Node.js](https://nodejs.org)
* npm

### Commands
```bash
npm install # install all dependencies for npm run bootstrap
npm run bootstrap # install all dependencies and symlinks the internal modules for all modules
npm run build # runs rollup
npm run test # runs all tests 
npm run clean # removes all the node_modules folders in all modules

```

### Support

![node](https://img.shields.io/badge/node->=8-green.svg)

### Community


[repo]: https://github.com/ethereum/floydsdk