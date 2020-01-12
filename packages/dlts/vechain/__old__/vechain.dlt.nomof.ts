import Vechain from "../src/vechain.dlt";
import VechainProvider from "../src/vechain.provider";
import FloydSDK from "@floyd/core";
import {
  InterfaceVechainTransactionOptions,
  InterfaceVechainTransaction,
  InterfaceContract,
  InterfaceContractOptions,
  InterfaceContractReceipt,
  InterfaceContractDeployOptions,
  TypeDLT,
  TypeAccount
} from "@floyd/utils";
import { cry } from "thor-devkit";
import "jest-extended";
import { Contract } from "web3-eth-contract";

describe("vechain", () => {
  const vechainDLTOptions = {
    name: "vechain",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  const notVechainDLTOptions = {
    name: "notvechain",
    provider: {
      uri: "http://localhost:4444"
    }
  };

  let sdk: FloydSDK;
  let vechain: Vechain;
  beforeEach(() => {
    const options = {
      dlts: [vechainDLTOptions]
    };
    sdk = new FloydSDK(options);
    vechain = new Vechain(sdk, vechainDLTOptions);
  });

  describe("provider", () => {
    test("should throw error if provider does not exist", () => {
      const dltOptions: TypeDLT = notVechainDLTOptions;
      try {
        new Vechain(sdk, dltOptions);
      } catch (e) {
        expect(e).toEqual(
          Error(
            "[Provider] The Provider for this DLT is not present, please add the provider for notvechain manually."
          )
        );
      }
    });

    test("should return a provider object", () => {
      const dltOptions: TypeDLT = vechainDLTOptions;
      const vechain = new Vechain(sdk, dltOptions);
      expect(vechain.provider).toBeInstanceOf(VechainProvider);
    });
  });

  describe("contracts", () => {
    vechain = new Vechain(sdk, vechainDLTOptions);
    const abi = [
      {
        type: "constructor",
        payable: false,
        stateMutability: "nonpayable",
        inputs: [{ name: "testInt", type: "uint256" }]
      },
      {
        type: "function",
        name: "foo",
        constant: false,
        payable: false,
        stateMutability: "nonpayable",
        inputs: [
          { name: "b", type: "uint256" },
          { name: "c", type: "bytes32" }
        ],
        outputs: [{ name: "", type: "address" }]
      },
      {
        type: "event",
        name: "Event",
        inputs: [
          { indexed: true, name: "b", type: "uint256" },
          { indexed: false, name: "c", type: "bytes32" }
        ],
        anonymous: false
      },
      {
        type: "event",
        name: "Event2",
        inputs: [
          { indexed: true, name: "b", type: "uint256" },
          { indexed: false, name: "c", type: "bytes32" }
        ],
        anonymous: false
      }
    ];
    const addr = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe";
    const fromAddress = "0x1234567890123456789012345678901234567891";
    const gasPrice = "20000000000";
    const contractOptions: InterfaceContractOptions = {
      jsonInterface: abi,
      address: addr,
      options: {
        from: fromAddress,
        gasPrice: gasPrice
      }
    };
    describe("createContract", () => {
      describe("should create contract instance", () => {
        let contract = vechain.createContract(contractOptions);
        expect(contract.options.address).toBe(addr);
        expect(contract.options.jsonInterface).toEqual(abi);
        expect(contract.options.from).toBe(fromAddress);
        expect(contract.options.gasPrice).toBe(gasPrice);
        expect(contract.options.gas).toBe(undefined);
      });

      describe("should be instance of web3 contract", () => {
        let contract = vechain.createContract(contractOptions);
        expect(contract).toBeInstanceOf(Contract);
      });

      describe("should fail if abi is invalid", () => {
        let contractOptionsAbiFail: InterfaceContractOptions = {
          jsonInterface: [],
          address: addr
        };
        expect(() => {
          let contract = vechain.createContract(contractOptionsAbiFail);
        }).toThrowError(new Error("[Vechain] The ABI provided is invalid"));
      });
    });
    describe("deployContract", () => {
      let contractInstance: Contract.Contract = vechain.createContract(
        contractOptions
      );
      let contractDeployOptions: InterfaceContractDeployOptions = {
        contract: contractInstance
      };

      describe("data", () => {
        describe("should throw error if not provided", () => {
          expect(() => {
            vechain.deployContract(contractDeployOptions);
          }).toThrowError(
            new Error("[Vechain] Contract Data has not been provided")
          );
        });

        describe("should deploy successfully if provided", () => {
          // two ways to add data
          expect(() => {
            contractDeployOptions.contract.options.data = "0x12345...";
            vechain.deployContract(contractDeployOptions);
          }).not.toThrowError();

          expect(() => {
            contractDeployOptions.data = "0x12345...";
            vechain.deployContract(contractDeployOptions);
          }).not.toThrowError();
        });
      });

      describe("from", () => {
        let contractOptions: InterfaceContractOptions = {
          jsonInterface: abi,
          address: addr,
          options: {
            gasPrice: gasPrice
          }
        };
        let contractInstance = vechain.createContract(contractOptions);
        let contractDeployOptions: InterfaceContractDeployOptions = {
          contract: contractInstance,
          data: "0x12345..."
        };
        describe("should throw error if not provided", () => {
          expect(() => {
            vechain.deployContract(contractDeployOptions);
          }).toThrowError(
            new Error("[Vechain] From address has not been provided")
          );
        });

        describe("should deploy successfully if provided", () => {
          expect(() => {
            contractDeployOptions.contract.options.from = "0x12345...";
            vechain.deployContract(contractDeployOptions);
          }).not.toThrowError();

          expect(() => {
            contractDeployOptions.fromAddress = "0x12345...";
            vechain.deployContract(contractDeployOptions);
          }).not.toThrowError();
        });
      });

      describe("should throw error if something fails", () => {
        contractDeployOptions.data = "0x12345...";
        contractDeployOptions.fromAddress = "0x98765...";

        // const mockDeployContract = jest
        //   .fn(contractDeployOptions.contract.deploy)
        //   .mockImplementation();
        //
        // contractDeployOptions.contract.send = mockDeployContract;
        //
        // vechain.deployContract(contractDeployOptions).catch(err => {
        //   expect(err).toStrictEqual(
        //     new Error(
        //       "[Vechain] Something went wrong when deploying the contract."
        //     )
        //   );
      });
    });
  });

  describe("accounts", () => {
    vechain = new Vechain(sdk, vechainDLTOptions);
    const goodAccount: TypeAccount = {
      privateKey:
        "38860424dada37e66026d5a3e1af5f2a45e2b7cdb3641bc4ba6b3881cd11caca",
      address: "0x7f4ab4b4b6a5c270c62997835baba027dde1ccb0"
    };
    describe("createAccount", () => {
      describe("should return an account object", () => {
        const account: TypeAccount = vechain.createAccount();
        expect(account.privateKey).toBeString();
        expect(account.address).toBeString();
        expect(account.address).toStartWith("0x");
      });
    });
    describe("privateKeyToAccount", () => {
      describe("should return an account object", () => {
        const account: TypeAccount = vechain.privateKeyToAccount(
          goodAccount.privateKey
        );
        expect(account.privateKey).toBeString();
        expect(account.address).toBeString();
        expect(account.address).toStartWith("0x");
        expect(account).toEqual(goodAccount);
      });
    });
    describe("addAccount", () => {
      describe("should throw error if empty privKey provided", () => {
        expect(() => {
          const badAccount: TypeAccount = {
            privateKey: "",
            address: "0x7f4ab4b4b6a5c270c62997835baba027dde1ccb0"
          };
          vechain.addAccount(badAccount);
        }).toThrowError(new Error("[Vechain] The account provided is invalid"));
      });

      describe("should throw error if empty address provided", () => {
        expect(() => {
          const badAccount: TypeAccount = {
            privateKey:
              "38860424dada37e66026d5a3e1af5f2a45e2b7cdb3641bc4ba6b3881cd11caca",
            address: ""
          };
          vechain.addAccount(badAccount);
        }).toThrowError(new Error("[Vechain] The account provided is invalid"));
      });

      describe("should add account if address and privateKey is passed in as args", () => {
        const account = vechain.addAccount(goodAccount);
        expect(account).toEqual(goodAccount);
        expect(account.address).toStartWith("0x");
        expect(account).toBeOneOf(vechain.accounts);
      });

      describe("should add account empty argumnents", () => {
        const account = vechain.addAccount();
        expect(account.address).toStartWith("0x");
        expect(account).toBeOneOf(vechain.accounts);
      });
    });
  });

  describe("subscriptions", () => {
    let vechain = new Vechain(sdk, vechainDLTOptions);
    describe("subscribe", () => {
      it("throw error", () => {
        expect(() => {
          vechain.subscribe("error");
        }).toThrowError(new Error("Method not implemented."));
      });
    });

    describe("clearSubscriptions", () => {
      it("throw error", () => {
        expect(() => {
          vechain.clearSubscriptions();
        }).toThrowError(new Error("Method not implemented."));
      });
    });
  });
});
