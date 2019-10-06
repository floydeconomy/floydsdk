import AbstractDLT from "./dlt";

class Bitcoin extends AbstractDLT {
  /**
   * @inheritdoc
   */
  constructor(sdk: any, options: Object = {}) {
    super("Bitcoin", "XBT", sdk, options);
  }
}

export default Bitcoin;
