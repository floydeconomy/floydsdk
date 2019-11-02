import AbstractDLT from "../dlt";
import { TypeDLT } from "../../../types/sdk";

class Binance extends AbstractDLT {
  /** @inheritdoc */
  name: string = "binance";
  
  /** @inheritdoc */
  symbol: string = "eth";

  /** @inheritdoc */
  constructor(sdk: any, options: TypeDLT) {
    super(sdk, options);
  }
}

export default Binance;
