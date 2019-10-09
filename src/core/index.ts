import { TypeDLT, TypeNetwork, TypeSDK } from "../types";
import AbstractDLT from "../abstract/dlts/dlt";

/**
 * This class is the base class the software development kit. It facilitates the methods
 * that can be carried out using this kit. It's a library that allows developers to create
 * transactions on different blockchains, using a single interface.
 */
class FloydSDK {
  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts: { [key: string]: AbstractDLT } = {};

  /**
   * This is the network type that is being connected to
   */
  network: TypeNetwork;

  /**
   * Constructor
   * @param options 
   */
  constructor(options: TypeSDK) {
    // validate
    this.validateDLT(options.dlts);

    // defaults to testnet if not provided
    this.network = (options.provider && options.provider.network) || "testnet";

    // create dlts
    options.dlts.forEach((dltConfig: TypeDLT) => {
      const dlt = this.loadDLT(dltConfig);
      this.dlts[dlt.name] = dlt;
    });
  }

  /**
   * Validate the provided dlts options
   * @param dlts
   */
  private validateDLT(dlts: TypeDLT[]): void {
    if (!dlts || dlts.length === 0) {
      throw new Error("There arent any DLTs provided.");
    }
  }

  /**
   * Load the dlt to the Overledger SDK
   * @param {Object} config
   * @return { AbstractDLT }
   */
  private loadDLT(dlt: TypeDLT) : AbstractDLT {
    const dltName = `${dlt.name}`;
    try {
      const provider = require(`../abstract/dlts/${dltName}`).default;
      return new provider(this, dlt);
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        throw new Error(`The DLT name provided is not valid, please add ${dltName} manually`);
      }
    }
  }
}

export default FloydSDK;
