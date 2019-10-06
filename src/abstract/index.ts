abstract class AbstractDLT {
  name: string;
  sdk: any;
  options: Object;

  /**
   * @param {any} sdk
   * @param {Object} options
   */
  constructor(name: string, sdk: any, options: Object = {}) {
    this.name = name;
    this.sdk = sdk;
    this.options = options;
  }
}

export default AbstractDLT;