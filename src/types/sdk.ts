type TypeProvider = {
  network?: TypeNetwork;
  timeout?: number;
};

type TypeDLT = {
  name: string,
};

/** Note: 
 * network must not be restricted to just mainnet and testnet, it can be anything,
 * however, in the event that provider is omitted, and default configurations run,
 * then, only mainnet or testnet exists.
 */
type TypeNetwork = "mainnet" | "testnet" | string;

type TypeSDK = {
  dlts: TypeDLT[];
  provider?: TypeProvider;
};

type TypeAccount = {
  privateKey: string;
  address: string;
}

export { TypeSDK, TypeNetwork, TypeProvider, TypeDLT, TypeAccount };
