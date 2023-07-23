import { ethers } from "ethers";
import { FormattedRpcResponse, RpcRequestParams } from "../types/methods";

export const sendTransaction = async ({
  web3Provider,
  method,
  amount,
}: RpcRequestParams): Promise<FormattedRpcResponse> => {
  if (!web3Provider) {
    throw new Error("web3Provider not connected");
  }
  const [address] = await web3Provider.listAccounts();
  if (!address) {
    throw new Error("No address found");
  }

  const DAI_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const contract = new ethers.Contract(
    DAI_CONTRACT_ADDRESS,
    [
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    web3Provider
  );
  const toAddress = "0x1C20569950B926d4aaFCa17E55F07fE9CaF32827";

  const parsedAmount = ethers.utils.parseUnits((amount ?? 0).toString(), 18);

  const data = contract.interface.encodeFunctionData("transfer", [
    toAddress,
    parsedAmount,
  ]);

  const tx = {
    from: address,
    to: DAI_CONTRACT_ADDRESS,
    data,
  };

  const signedTx = await web3Provider.send("eth_sendTransaction", [tx]);

  return {
    method,
    address,
    valid: true,
    result: signedTx,
  };
};

// export const sendTransaction = async ({
//   web3Provider,
//   method,
//   amount,
// }: RpcRequestParams): Promise<FormattedRpcResponse> => {
//   if (!web3Provider) {
//     throw new Error("web3Provider not connected");
//   }
//   const [address] = await web3Provider.listAccounts();
//   if (!address) {
//     throw new Error("No address found");
//   }

//   const tx = {
//     from: address,
//     to: "0x1C20569950B926d4aaFCa17E55F07fE9CaF32827",
//     data: "0x",
//     value: ethers.utils
//       .parseEther((!amount ? 0 : amount).toString())
//       .toHexString(),
//   };

//   const signedTx = await web3Provider.send("eth_sendTransaction", [tx]);

//   return {
//     method,
//     address,
//     valid: true,
//     result: signedTx,
//   };
// };
