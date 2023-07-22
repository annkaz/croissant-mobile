import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../assets/CroissantNouns.png";
import { truncateAddress } from "../utils/HelperUtils";
import { useRef } from "react";

export default function Header() {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const { isConnected, open, provider, address } = useWalletConnectModal();

  const handleWalletDisconnect = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };
  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => rotateValue.setValue(0));
  };

  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.connectContainer}>
      <TouchableOpacity onPress={startAnimation}>
        <Animated.Image
          source={logo}
          style={{
            width: 60,
            height: 60,
            alignItems: "center",
            transform: [{ scale: scaleValue }, { rotate: rotation }],
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWalletDisconnect}>
        <Text style={styles.text}>
          {isConnected ? `${truncateAddress(address)}` : "Connect Wallet"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  connectContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcaf00",
    borderRadius: 15,
    width: 170,
    height: 40,
    borderWidth: 1,
    borderColor: "#fcaf00",
    marginTop: 4,
  },
  text: {
    fontWeight: "700",
    color: "#fff",
  },
});
