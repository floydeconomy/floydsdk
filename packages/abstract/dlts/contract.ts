abstract class ContractAdapter {
  private jsonInterface: string;
  private address: string;
  private options: any;
  private contract: any;

  constructor(jsonInterface: string, address: string, options: any) {
    if (jsonInterface.length < 1) {
      throw new Error("The Contract instance has failed to be instantiated");
    }
    this.jsonInterface = jsonInterface;
    this.address = address;
    this.options = options;

    try {
      this.contract = this._createContract(
        this.jsonInterface,
        this.address,
        this.options
      );
    } catch (e) {
      throw e;
    }
  }

  abstract _createContract(
    jsonInterface: string,
    address: string,
    options: any
  ): any;
}

export default ContractAdapter;
