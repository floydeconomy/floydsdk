import TypeDLT from "./dlt";

type TypeProvider = {
  network?: TypeNetwork;
  timeout?: number;
};

type TypeNetwork = "mainnet" | "testnet" | string;

type TypeSDK = {
  dlts: TypeDLT[];
  provider?: TypeProvider;
};

export { TypeSDK, TypeNetwork, TypeProvider };
