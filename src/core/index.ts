import { TypeDLT, TypeSDK } from "../utils/types/index";
import AbstractDLT from "../abstract/dlts/dlt";

/**
 * This class is the base class the software development kit. It facilitates the methods
 * that can be carried out using this kit. It's a library that allows developers to create
 * transactions on different blockchains, using a single interface.
 *
 * @author Jeevan Pillay
 */
class FloydSDK {
  /**
   * The object storing the DLTs loaded by the Overledger sdk
   */
  dlts: { [key: string]: AbstractDLT } = {};

  /**
   * Creates the required configurations for the DLT's provided.
   * @param {TypeSDK} options
   */
  constructor(options: TypeSDK) {
    // validate
    this.validateDLT(options.dlts);

    // create dlts
    options.dlts.forEach((dltConfig: TypeDLT) => {
      const dlt = this.loadDLT(dltConfig);
      this.dlts[dlt.name] = dlt;
    });
  }

  /**
   * Validate the provided dlts options
   * @param {TypeDLT[]} dlts
   */
  private validateDLT(dlts: TypeDLT[]): void {
    if (!dlts || dlts.length === 0) {
      throw new Error("[DLT] There arent any DLTs provided.");
    }
  }

  /**
   * Load the dlt to the Overledger SDK
   * @param {Object} dltConfig
   * @return {AbstractDLT}
   */
  private loadDLT(dltConfig: TypeDLT): AbstractDLT {
    const dltName = `${dltConfig.name}`;
    try {
      const dlt = require(`../abstract/dlts/${dltName}/${dltName}.dlt`).default;
      return new dlt(this, dltConfig);
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          `[DLT] The DLT name provided is not valid, please add ${dltName} manually`
        );
      } else {
        throw e;
      }
    }
  }
}

export default FloydSDK;
