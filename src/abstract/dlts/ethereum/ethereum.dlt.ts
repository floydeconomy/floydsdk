import AbstractDLT from "../dlt";
import { TypeAccount, TypeProvider, TypeDLT } from "../../../types/sdk";

class Ethereum extends AbstractDLT {
  /** @inheritdoc */
  name: string = "ethereum";
  
  /** @inheritdoc */
  symbol: string = "eth";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }

  /**  @inheritdoc */
  addAccount(privateKey?: string): TypeAccount {
      return;
    }
}

export default Ethereum;
