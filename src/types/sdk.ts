type TypeProvider = {
  timeout?: number | 0;
  uri: string;
};

type TypeDLT = {
  name: string,
  privateKeys?: [String],
  provider?: TypeProvider
};

type TypeSDK = {
  dlts: TypeDLT[];
};

type TypeAccount = {
  privateKey: string;
  address: string;
}

export { TypeSDK, TypeProvider, TypeDLT, TypeAccount };
