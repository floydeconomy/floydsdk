![FloydSDK Logo](/floyd.png)

# FloydSDK - Standarised Typescript API

This is the FloydSDK [Typescript API] which serves as a multi-blockchain software development kit that allows developers to utilise multiple blockchain through a single interface. The issue is that when developing decentralised applications, developers tend to be coupled down to a single blockchain, for example, Ethereum (through web3). This SDK allows developers to leverage different blockchain and being able to change the blockchain layer through a single line.

Note, some methods that are described in the `dlt.ts` file like createContract are specific to the blockchains that allow contracts. For example, `Ethereum` and `Vechain` both use EVM as the virtual machine interface, whereas, `Binance Chain` does not offer such capabilities. Hence, Binance Chain will throw an error when using `createContract`.

Supported blockchains:

- Ethereum [web3](https://github.com/ethereum/web3.js)
- Vechain [thorify](https://github.com/vechain/thorify)
- Binance Chain [bnb-js-sdk](https://github.com/binance-chain/javascript-sdk/)

Pipelined blockchains:

- Ripple [ripple-lib](https://github.com/ripple/ripple-lib)
- EOS [eos-js](https://github.com/EOSIO/eosjs)
- Bitcoin [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

# Major Updates Information (VERY IMPORTANT)

The current repository commit is undergoing a major overheal in terms of structure, whereby, we are modularising the repository through lerna which allows us to create a monorepo structure. This will allow developers to take advantage of various different libraries that we offer such.

- @floyd/abstract
- @floyd/core
- @floyd/utils
- @floyd/vechain
- @floyd/ethereum
- @floyd/binance

Note, the introduction of the monorepo has broken most of the test implementation, hence, it recommended to use an older commit this we get this sorted out. Also, checkout branch lerna for latest update on monorepo structure.

## Getting Started

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
yarn test:vechain
yarn test:ethereum
yarn test:binance
yarn test:coverage
```

### Usage with TypeScript

```typescript
import FloydSDK from "floyd";
const options = {
  dlts: [
    {
      name: "ethereum",
      provider: {
        uri: "http://localhost:4444"
      }
    },
    {
      name: "vechain",
      provider: {
        uri: "http://localhost:8485"
      }
    }
  ]
};
const floyd = new FloydSDK(options);
```

### Send Transaction

This allows developers to customise their transaction options to the standarized interfaced. However, depending on the blockchain, some fields may differ.

All examples are based on Vechain, however, you can safely assume that replacing `vechain` with `binance` or `ethereum` would work as well.

Supported methods:

- `buildTransaction`: Creates a new transaction
- `sendTransaction`: Sends an unsigned transaction, but required the privateKey to be in the in-memory wallet.
- `sendSignedTransaction`: Sends a signed transaction

Example of Supported Methods

```typescript
// options
const options: InterfaceVechainTransactionOptions = {
  nonce: 12345678,
  value: 21000,
  from: "0x12345...",
  gasPrice: 128,
  gas: 21000
};

// build transaction
const transaction = vechain.buildTransaction(toAddress, message, options);

// send transaction
vechain
  .sendTransaction(transaction)
  .then(receipt => {
    console.log(receipt);
  })
  .catch(error => {
    console.log(error);
  });

// create signature
const signature = vechain.signTransaction(transaction, fromAddress);

// sending signed transaction
vechain
  .sendTransaction(signature)
  .then(receipt => {
    console.log(receipt);
  })
  .catch(error => {
    console.log(error);
  });
```

## Creating accounts

This allows developers to generate accounts on different blockchains through. The accounts are based on `TypeAccount`, which includes two fields `privateKey` and `address`

Supported methods:

- `createAccount`: Creates and returns an account
- `privateKeyToAccount`: Converts the private key provided into an account
- `addAccount`: Adds an account to the wallet manager, allows no args which creates a new account, also allows an account to be provided.

Example of TypeAccount

```typescript
const accounts: TypeAccount = {
  privateKey: "38860424dada37e66026d5...",
  address: "0x7f4ab4b4b6a5c270c629978..."
};
```

Example of Supported Methods

```typescript
// createAccount
const account: TypeAccount = vechain.createAccount();

// privateKeyToAccount
const account1: TypeAccount = vechain.privateKeyToAccount("38860424d...");

// addAccount
vechain.addAccount(account1);
vechain.addAccount();
```

### Requirements

- [Node.js](https://nodejs.org)
- npm
- jest
- ethereum, vechain, binance nodes
