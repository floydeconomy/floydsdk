import AbstractDLT from "../dlt";
import { TypeDLT } from "../../../types/sdk";

class Vechain extends AbstractDLT {
  /** @inheritdoc */
  name: string = "vechain";
  
  /** @inheritdoc */
  symbol: string = "vet";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }
}

export default Vechain;
