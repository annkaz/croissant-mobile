import type { IProviderMetadata } from "@walletconnect/modal-react-native";

export const providerMetadata: IProviderMetadata = {
  name: "Croissant Protocol",
  description: "Croissant Protocol Mobile",
  url: "https://walletconnect.com/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "rnwalletconnectmodalexpo://",
  },
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        "eth_sendTransaction",
        "eth_signTransaction",
        "eth_sign",
        "personal_sign",
        "eth_signTypedData",
        "eth_call",
        "eth_getTransactionReceipt",
      ],
      chains: ["eip155:5"],
      events: ["chainChanged", "accountsChanged"],
      rpcMap: {},
    },
  },
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
