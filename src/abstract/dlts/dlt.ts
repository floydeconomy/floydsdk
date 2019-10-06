abstract class AbstractDLT {
  _name: string;
  _symbol: string;
  sdk: any;
  options: Object;

  /**
   * @param {any} sdk
   * @param {Object} options
   */
  constructor(name: string, symbol: string, sdk: any, options: Object = {}) {
    this.sdk = sdk;
    this.options = options;
    this._name = name;
    this._symbol = symbol;
  }

  get name(): string {
    return this.name;
  }

  get symbol(): string {
    return this.symbol;
  }
}

export default AbstractDLT;