import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import { setStringAsync } from "expo-clipboard";
import { PROJECT_ID } from "@env";
import { sessionParams, providerMetadata } from "../constants/Config";
import { truncateAddress } from "../utils/HelperUtils";

export default function App() {
  const { isConnected, open, provider, address } = useWalletConnectModal();
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  console.log("address", address);

  const onCopyClipboard = async (value: string) => {
    setStringAsync(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.connectContainer}>
        <Text style={styles.logoText}>🥐</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.text}>
            {isConnected ? `${truncateAddress(address)}` : "Connect Wallet"}
          </Text>
        </TouchableOpacity>
      </View>
      <WalletConnectModal
        projectId={PROJECT_ID}
        onCopyClipboard={onCopyClipboard}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 170,
    height: 40,
    borderWidth: 1,
    borderColor: "#3396FF",
    marginTop: 4,
  },
  text: {
    color: "#3396FF",
    fontWeight: "700",
  },
  logoText: {
    fontSize: 30,
    textAlign: "center",
  },
});
